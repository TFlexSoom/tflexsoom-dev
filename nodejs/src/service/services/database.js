import Service from 'src/service';
import ConfigurationService from './configurator';

import { Sequelize } from 'sequelize';


export function getInstance() {
    if (!sequelize) {
        throw new Error("Consistent Database Instance not configured!");
    }

    return sequelize;
}


export default class DatabaseService extends Service {
    static INSTANCE = new DatabaseService();
    static configurator = ConfigurationService.INSTANCE;
    sequelize = null;
    models = new Set();

    construct() {

    }

    async start() {

    }

    async load() {
        const config = (configurator.getConfiguration())?.consitent || {};

        if (!config.connectionString) {
            console.debug("No SQL Database string provided... defaulting to sqlite");
        }

        sequelize = new Sequelize(config.connectionString || 'sqlite::memory:', {
            pool: config.pool || {}
        });

        for (const m of models) {
            if (config.verboseSchemas) {
                console.log("Defining Schema For: " + m + " with " + sequelize);
            }

            m.classDefine(sequelize);
        }

        await sequelize.sync({ force: true });
    }

    async cleanup() { }

    // Call on Start
    addModel(model) {
        models.add(model);
    }

    getName() {
        return "Database Service";
    }
}