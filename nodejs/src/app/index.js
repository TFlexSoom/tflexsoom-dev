import Service from '../service';
import * as handlers from '../handler';

export function start() {
    return new Promise(startPromise)
}

async function startPromise(resolve, reject) {
    try {
        await Service.construct(); // Create Memory
        await Service.start(); // Start Without Configuration
        await Service.config(); // Load Based on Configuration
        await Service.cache(); // Cache anything from DB or other services
        await handlers.serve(); // Ready Handlers

    } catch (e) {
        reject(e);
        return;
    }

    resolve();
}

export function reconfig() {
    return new Promise(reconfigPromise);
}

async function reconfigPromise(resolve, reject) {
    try {
        await Service.config();
    } catch (e) {
        reject(e);
        return;
    }

    resolve();
}

export function recache() {
    return new Promise(recachePromise);
}

async function recachePromise(resolve, reject) {
    try {
        await Service.cache();
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