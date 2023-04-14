import Service from '../index.js';
import { existsSync } from 'node:fs';

export default class ConfigurationService extends Service {
    static INSTANCE = new ConfigurationService();
    configuration = {};

    async load() {
        if (!existsSync("./configuration-node.json")) {
            return;
        }

        this.configuration = require("./configuration-node.json");
    }

    getConfiguration() {
        return this.configuration;
    }

    getName() {
        return "CONFIGURATION SERVICE";
    }
}