import Service from '../index.js';

export default class MetaService extends Service {
    static INSTANCE = new MetaService();
    isConstructed = false;
    isStarted = false;
    lastLoad = null;

    construct() {
        this.isConstructed = true;
    }

    async start() {
        this.isStarted = true;
    }

    async load() {
        this.lastLoad = Date.now();
    }

    async cleanup() { }

    getIsConstructed() {
        return this.isConstructed;
    }

    getIsStarted() {
        return this.isStarted;
    }

    getLastLoad() {
        return this.lastLoad || "Not Loaded!";
    }

    getName() {
        return "META SERVICE";
    }
}