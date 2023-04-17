import Service from '../index.js';
import ConfigurationService from './configurator.js';
import DatabaseService from './database.js';

import date from 'date-and-time';

export default class LeaderboardService extends Service {
    static INSTANCE = new LeaderboardService();
    isOn = false;

    async start() {
        const dbService = DatabaseService.INSTANCE;
        dbService.addModel(Leaderboard);
    }

    async load() {
        const config = ConfigurationService.INSTANCE.getConfiguration()?.leaderboard || {};
        this.isOn = config?.isOn || true;
    }

    async addNewScore(name, score) {
        Leaderboard.create({
            name: name,
            score: score,
            completedAt: Date.now(),
        });
    }

    async getLeaderboard() {
        if (!this.isOn) {
            return;
        }

        return Leaderboard.findAll({
            limit: 30,
            orderBy: score,
        });
    }

    getName() {
        return "TRACKER SERVICE";
    }
}

class Leaderboard extends Model {
    static classDefine(sequelize) {
        Leaderboard.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                score: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                completedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                }
            },
            {
                sequelize,
                modelName: "leaderboard",
                indexes: [{ fields: ['score'] }, { fields: ['name'] }]
            }
        );
    }
}