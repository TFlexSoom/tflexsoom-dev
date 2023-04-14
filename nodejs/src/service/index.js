import { readdirSync } from 'node:fs';

export default class Service {
    static serviceList = [];

    // Import and construct each service.
    static async construct() {
        Service.serviceList = [];
        const files = readdirSync('src/service/services');
        for (const file of files) {
            const serviceModule = await import('./services/' + file);
            const service = serviceModule.default.INSTANCE;
            Service.serviceList.push(service);
            service.construct();
        }
    }

    // Start all services in `serviceList`
    static async start() {
        // TODO asyncio this
        for (const service of Service.serviceList) {
            await service.start();
        }
    }

    // Load all services in `serviceList`
    static async load() {
        // TODO asyncio this
        for (const service of Service.serviceList) {
            await service.load();
        }
    }

    construct() { }
    async start() { }
    async load() { }
    async cleanup() { }
    getName() { return "DEFAULT" }
}