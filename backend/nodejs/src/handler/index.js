import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';
import ConfigurationService from '../service/services/configurator.js';

const app = express();

// Handlers
const files = readdirSync('src/handler/handlers');
for (const file of files) {
    const importedFile = await import('./handlers/' + file);
    app.use(importedFile.router);
}

export async function serve() {
    const configurator = ConfigurationService.INSTANCE;

    const corsOptions = {
        origin: true,
        optionsSuccessStatus: 204,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: true,
    }

    // Plugins
    app.use(express.json());
    app.use(cors(corsOptions));

    const port = configurator.getConfiguration()?.port || 8080;
    app.listen(port);
}