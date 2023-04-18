import Service from '../index.js';
import ConfigurationService from './configurator.js';
import DatabaseService from './database.js';

import { createHash } from 'node:crypto';
import date from 'date-and-time';

import pkg from 'sequelize';
const { Model, Op, DataTypes } = pkg;

export default class TrackerService extends Service {
    static INSTANCE = new TrackerService();
    static HASH = createHash("sha256");
    isOn = false;
    secret = "123456";

    async start() {
        const dbService = DatabaseService.INSTANCE;
        dbService.addModel(VisitorTrack);
    }

    async config() {
        const config = ConfigurationService.INSTANCE.getConfiguration()?.visitorTracker || {};
        this.isOn = config?.isOn || true;
        this.secret = config?.secret || this.secret;
    }

    async track(ipAddress, path) {
        if (!this.isOn) {
            return;
        }

        const trackedPath = path || "";
        HASH.update(ipAddress + this.secret);

        VisitorTrack.create({
            path: trackedPath,
            visitorHash: HASH.digest('hex').substring(0, 6),
            lastVisited: Date.now(),
        });
    }

    async limit(ipAddress, limitKey, limitVal) {
        if (!this.isOn) {
            return true;
        }

        await this.track(ipAddress, limitKey);
        HASH.update(ipAddress + this.secret);

        const visitors = VisitorTrack.findAll({
            where: {
                path: limitKey,
                visitorHash: HASH.digest('hex').substring(0, 6),
                lastVisited: {
                    [Op.gt]: date.addDays(Date.now(), -1)
                }
            }
        });

        return visitors.length >= limitVal;
    }

    async getVisitorCount(path) {
        if (!this.isOn) {
            return;
        }

        const trackedPath = path || "";

        return VisitorTrack.findAll({
            where: {
                path: trackedPath,
                lastVisited: {
                    [Op.gt]: date.addMinutes(Date.now(), -5)
                }
            }
        });
    }

    getName() {
        return "TRACKER SERVICE";
    }
}

class VisitorTrack extends Model {
    static classDefine(sequelize) {
        VisitorTrack.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                path: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: "hashPath",
                },
                visitorHash: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: "hashPath",
                },
                lastVisited: {
                    type: DataTypes.DATE,
                    allowNull: false,
                }
            },
            {
                sequelize,
                modelName: "visitor_track",
                indexes: [{ fields: ['path'] }, { fields: ['lastVisited'] }]
            }
        );
    }
}