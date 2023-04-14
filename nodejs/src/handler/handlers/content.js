import * as express from 'express';
import ConfigurationService from '../../service/services/configurator';

const configurator = ConfigurationService.INSTANCE;

export const router = express.Router({
    caseSensitive: false,
});

router.all("/content/:path", async (req, res, next) => {
    const contentConfig = configurator.getConfiguration()?.content || {}
    const path = req.params.path;

    if (!contentConfig?.useCdn) {
        res.status(200).sendFile(path);
        return;
    }

    res.status(301).redirect(contentConfig?.urlRoot + path);
});
