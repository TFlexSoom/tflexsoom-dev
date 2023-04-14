
import * as express from 'express';
import MetaService from '../../service/services/meta.js';
import DatabaseService from '../../service/services/database.js';

export const router = express.Router({
    caseSensitive: false,
});

router.all("/service", async (req, res, next) => {
    const meta = MetaService.INSTANCE;
    res.status(200).send({
        constructed: meta.getIsConstructed(),
        started: meta.getIsStarted(),
        lastLoad: meta.getLastLoad(),
    });
});

router.all("/database/check", async (req, res, next) => {
    res.status(200).send({
        success: DatabaseService.INSTANCE.testConnection(),
    });
});
