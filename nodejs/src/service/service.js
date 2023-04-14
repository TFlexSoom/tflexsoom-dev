import { readdirSync } from 'node:fs';

export default class Service {
    static serviceList = [];

    // Import and construct each service.
    static construct() {
        Service.serviceList = [];
        const files = readdirSync('src/service/services');
        for (const file of files) {
            const serviceClass = require('src/service/services/' + file);
            const service = serviceClass.INSTANCE;
            serviceList.push(service);
            service.construct();
        }
    }

    // Start all services in `serviceList`
    static async start() {
        // TODO asyncio this
        for (const service in serviceList) {
            await service.start();
        }
    }

    // Load all services in `serviceList`
    static async load() {
        // TODO asyncio this
        for (const service in serviceList) {
            await service.load();
        }
    }

    static getList() {
        return Service.serviceList;
    }

    construct() { }
    async start() { }
    async load() { }
    async cleanup() { }
    getName() { return "DEFAULT" }
}