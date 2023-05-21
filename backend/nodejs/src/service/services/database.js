import Service from '../index.js';
import ConfigurationService from './configurator';

import pkg from 'sequelize';
const { Sequelize } = pkg;

export default class DatabaseService extends Service {
    static INSTANCE = new DatabaseService();
    static configurator = ConfigurationService.INSTANCE;
    sequelize = null;
    models = new Set();

    async config() {
        const config = (DatabaseService.configurator.getConfiguration())?.mysql || {};

        if (!config.uri) {
            console.debug("No SQL Database string provided... defaulting to sqlite");
            config.uri = 'sqlite::memory';
        }

        this.sequelize = new Sequelize(config.uri, { ...config });

        for (const m of this.models) {
            if (config.verboseSchemas) {
                console.log("Defining Schema For: " + m + " with " + this.sequelize);
            }

            m.classDefine(this.sequelize);
        }

        await this.sequelize.sync({ force: config?.dropTables });
    }

    // Call on Start
    addModel(model) {
        this.models.add(model);
    }

    getInstance() {
        if (!this.sequelize) {
            throw new Error("Consistent Database Instance not configured!");
        }

        return this.sequelize;
    }

    async testConnection() {
        try {
            const [results, metadata] = await this.sequelize.query("SELECT 1;");
        } catch (e) {
            console.error(`SQL Error: ${e}`)
            return false;
        }

        return true;
    }

    getName() {
        return "DATABASE SERVICE";
    }
}