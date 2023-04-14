import { existsSync } from 'node:fs';

import Service from 'src/service';

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