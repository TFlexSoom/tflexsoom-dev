import * as express from 'express';
import TrackerService from '../../service/services/visitorTracker.js';

export const router = express.Router({
    caseSensitive: false,
});

router.post("/tracker", async (req, res, next) => {
    const trackingService = TrackerService.INSTANCE;

    trackingService.track(req.ip, req.query?.path);

    res.status(200).send();
});

router.get("/tracker", async (req, res, next) => {
    const trackingService = TrackerService.INSTANCE;

    res.status(200).send({
        visitors: trackingService.getVisitorCount(req.query?.path),
    });
});
