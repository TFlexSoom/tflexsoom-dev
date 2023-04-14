import { existsSync } from 'node:fs';

import Service from 'src/service';

export default class ConfigurationService extends Service {
    static INSTANCE = new ConfigurationService();

    async load() {
        if (!existsSync("./configuration-node.json")) {
            configuration = {};
            return;
        }

        configuration = require("./configuration-node.json");
    }

    getName() {
        return "CONFIGURATION SERVICE";
    }
}