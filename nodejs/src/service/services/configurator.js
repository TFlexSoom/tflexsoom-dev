import Service from '../index.js';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

export default class ConfigurationService extends Service {
    static INSTANCE = new ConfigurationService();
    configuration = {};

    async load() {
        if (!existsSync("./configuration-node.json")) {
            return;
        }

        this.configuration = JSON.parse(
            readFileSync(join(cwd(), "/configuration-node.json"))
        );
    }

    getConfiguration() {
        return this.configuration;
    }

    getName() {
        return "CONFIGURATION SERVICE";
    }
}