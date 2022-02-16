'use strict'

import { Router } from 'express';
const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: global.PROJECT_NAME,
        version: global.PROJECT_VERSION
    });
});

export default router;