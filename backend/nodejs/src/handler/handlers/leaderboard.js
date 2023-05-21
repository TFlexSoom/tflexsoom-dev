import * as express from 'express';
import LeaderboardService from '../../service/services/leaderboard.js';

export const router = express.Router({
    caseSensitive: false,
});

router.post("/leaderboard/submit", async (req, res, next) => {
    const username = req.query?.username;

    console.log("Unable to submit leaderboard entries at this time.")
    // TODO add score to game
    // TODO add COPPA
    // TODO verify COPPA

    res.status(200).send();
});

router.post("/leaderboard/delete", async (req, res, next) => {
    const username = req.query?.username;

    console.log("Unable to submit leaderboard entries at this time.")
    // TODO make this a command only allowed from certain IP addresses via configuration

    const leaderboardService = LeaderboardService.INSTANCE;

    await leaderboardService.clearName(username);

    res.status(200).send();
});


router.get("/leaderboard", async (req, res, next) => {
    const leaderboardService = LeaderboardService.INSTANCE;

    res.status(200).send({
        visitors: await leaderboardService.getLeaderboard(),
    });
});
