import * as express from 'express';
import ConfigurationService from '../../service/services/configurator';
import AdventureService from '../../service/services/adventure';

const configurator = ConfigurationService.INSTANCE;
const adventure = AdventureService.INSTANCE;

export const router = express.Router({
    caseSensitive: false,
});

router.get("/adventure/playing", async (req, res, next) => {
    return res.status(200).send({
        playing: configurator.getConfiguration()?.adventure?.isOn,
    });
});

router.post("/adventure", async (req, res, next) => {
    const game = await adventure.createGame(req.ip, req.query?.class, req.query?.key);
    return res.status(200).send(game);
});

router.get("/adventure/{playerId}", async (req, res, next) => {
    const msg = await adventure.getLatestMessageFromId(req.params.playerId, req.query?.signage);
    if (msg.response === "") {
        return res.status(400).send(msg);
    }

    return res.status(200).send(msg);
});

router.post("/adventure/{playerId}", async (req, res, next) => {
    const msg = await adventure.makeMove(req.params.playerId, req.query?.signage, req.query?.action);
    if (msg.response === "") {
        return res.status(400).send(msg);
    }

    return res.status(200).send(msg);
});