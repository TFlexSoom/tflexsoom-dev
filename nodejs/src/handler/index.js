import express from 'express';

const app = express();

app.use(express.json());

export async function serve(configurator) {
    const port = configurator.port || 8080;
    app.listen(port);
}