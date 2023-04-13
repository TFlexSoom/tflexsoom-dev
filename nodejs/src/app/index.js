import * as configurator from '../configurator';
import * as services from '../service';
import * as handlers from '../handler';

export function start() {
    return new Promise( startPromise )
}

async function startPromise(resolve, reject) {
    try {
        const conf = configurator.getConfig();
        await services.construct();
        await services.start(conf);
        await handlers.serve(conf);

    } catch (e) {
        reject(e);
        return;
    } 

    resolve();
}