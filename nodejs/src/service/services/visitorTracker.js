import Service from '../index.js';
import ConfigurationService from './configurator.js';
import DatabaseService from './database.js';

import { createHash } from 'node:crypto';
import date from 'date-and-time';

import pkg from 'sequelize';
const { Model, Op, DataTypes } = pkg;

export default class TrackerService extends Service {
    static INSTANCE = new TrackerService();
    isOn = false;
    secret = "123456";

    hash(str) {
        return createHash("sha256").update(str).digest('hex');
    }

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

        const [tracking, isCreated] = await VisitorTrack.findOrCreate({
            where: {
                path: trackedPath,
                visitorHash: this.hash(ipAddress + this.secret).substring(0, 6),
            },
            defaults: {
                lastVisited: new Date(),
            }
        });

        if (isCreated) {
            console.log(`New Tracking Entry Created ${tracking?.visitorHash}`)
            return;
        }

        tracking.lastVisited = new Date();
        await tracking.save()
    }

    async limit(ipAddress, limitKey, limitVal) {
        if (!this.isOn) {
            return true;
        }

        const visitors = await VisitorTrack.findAll({
            where: {
                path: limitKey,
                visitorHash: this.hash(ipAddress + this.secret).substring(0, 6),
                lastVisited: {
                    [Op.gt]: date.addMinutes(new Date(), -5)
                }
            }
        });

        await this.track(ipAddress, limitKey);

        return !!visitors;
        // TODO fix to allow limits
        // return visitors.length < limitVal;
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
                    [Op.gt]: date.addMinutes(new Date(), -5)
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