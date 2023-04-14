import * as services from '../service';
import * as handlers from '../handler';

export function start() {
    return new Promise(startPromise)
}

async function startPromise(resolve, reject) {
    try {
        services.construct(); // Create Memory
        await services.start(); // Start Without Configuration
        await services.load(); // Load Based on Configuration
        await handlers.serve(); // Ready Handlers

    } catch (e) {
        reject(e);
        return;
    }

    resolve();
}

export function reload() {
    return new Promise(reloadPromise);
}

async function reloadPromise(resolve, reject) {
    try {
        await services.load();
    } catch (e) {
        reject(e);
        return;
    }

    resolve();
}

export function stop() {
    return new Promise(stopPromise);
}

async function stopPromise(resolve, reject) {
    try {
        await services.stop();
    } catch (e) {
        reject(e);
        return;
    }

    resolve();
}