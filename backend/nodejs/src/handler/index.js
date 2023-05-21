import express from 'express';
import { readdirSync } from 'fs';
import ConfigurationService from '../service/services/configurator.js';

const app = express();

// Plugins
app.use(express.json());

// Handlers
const files = readdirSync('src/handler/handlers');
for (const file of files) {
    const importedFile = await import('./handlers/' + file);
    app.use(importedFile.router);
}

const configurator = ConfigurationService.INSTANCE;

export async function serve() {
    const port = configurator?.port || 8080;
    app.listen(port);
}