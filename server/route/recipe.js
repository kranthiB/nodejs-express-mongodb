'use strict'

import { Router } from 'express';
const router = Router();
import { getAll, getById, create, update, deleteOne } from '../controller/recipe';

router.get('', getAll)
router.get('/:id', getById)
router.post('', create)
router.put('/:id', update)
router.delete('/:id', deleteOne)

export default router;