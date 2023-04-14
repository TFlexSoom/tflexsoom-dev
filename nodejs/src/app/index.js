import Service from '../service';
import * as handlers from '../handler';

export function start() {
    return new Promise(startPromise)
}

async function startPromise(resolve, reject) {
    try {
        await Service.construct(); // Create Memory
        await Service.start(); // Start Without Configuration
        await Service.load(); // Load Based on Configuration
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
        await Service.load();
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
        await Service.stop();
    } catch (e) {
        reject(e);
        return;
    }

    resolve();
}