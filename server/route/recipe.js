'use strict'

import { Router } from 'express';
const router = Router();
import { getAll, getById, create, update, deleteOne } from '../controller/recipe';
import { getAll as getAllReviews, getById as getByReviewId, create as createReview, update as updateReview, deleteOne as deleteReview } from '../controller/review';

router.get('', getAll)
router.get('/:id', getById)
router.post('', create)
router.put('/:id', update)
router.delete('/:id', deleteOne)


router.get('/:recipeId/reviews', getAllReviews)
router.get('/:recipeId/reviews/:reviewId', getByReviewId)
router.post('/:recipeId/reviews', createReview)
router.put('/:recipeId/reviews/:reviewId', updateReview)
router.delete('/:recipeId/reviews/:reviewId', deleteReview)

export default router;