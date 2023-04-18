import Service from '../index.js';
import ConfigurationService from './configurator.js';
import DatabaseService from './database.js';

import pkg from 'sequelize';
const { Model, Op, DataTypes } = pkg;

export default class LeaderboardService extends Service {
    static INSTANCE = new LeaderboardService();
    isOn = false;

    async start() {
        const dbService = DatabaseService.INSTANCE;
        dbService.addModel(Leaderboard);
    }

    async config() {
        const config = ConfigurationService.INSTANCE.getConfiguration()?.leaderboard || {};
        this.isOn = config?.isOn || true;
    }

    async addNewScore(name, score) {
        if (!this.isOn) {
            return;
        }

        Leaderboard.create({
            name: name,
            score: score,
            completedAt: Date.now(),
        });
    }

    async clearName(name) {
        if (!this.isOn) {
            return;
        }

        leaderboards = Leaderboard.findAll({
            where: {
                name: name,
            }
        });

        await leaderboards.forEach(async (item) => {
            await item.update({ name: "REDACTED" });
        });
    }

    async getLeaderboard() {
        if (!this.isOn) {
            return [];
        }

        return Leaderboard.findAll({
            limit: 30,
            orderBy: score,
        });
    }

    getName() {
        return "LEADERBOARD SERVICE";
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