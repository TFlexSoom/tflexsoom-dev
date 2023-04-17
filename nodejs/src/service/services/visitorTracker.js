import Service from '../index.js';
import ConfigurationService from './configurator.js';
import DatabaseService from './database.js';

import sha256 from 'crypto-js/sha256';
import { Op } from 'sequelize';
import date from 'date-and-time';

export default class TrackerService extends Service {
    static INSTANCE = new TrackerService();
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

        VisitorTrack.create({
            path: trackedPath,
            visitorHash: sha256(ipAddress + this.secret).toString().substring(0, 6),
            lastVisited: Date.now(),
        });
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