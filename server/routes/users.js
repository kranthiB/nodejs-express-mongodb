'use strict'

import { Router } from 'express';
const router = Router();
import { getAll, getById } from '../controllers/user';

router.get('', getAll)
router.get('/:id', getById)

export default router;