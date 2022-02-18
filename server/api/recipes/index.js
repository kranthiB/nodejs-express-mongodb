'use strict';

import express from 'express';

import {
  getAll,
  getById,
  create,
  update,
  deleteOne,
} from './recipes.controller';
import {
  getAll as getAllReviews,
  getById as getByReviewId,
  create as createReview,
  update as updateReview,
  deleteOne as deleteReview,
} from './reviews/reviews.controller';

let router = express.Router();

router.get('', getAll);
router.get('/:id', getById);
router.post('', create);
router.put('/:id', update);
router.delete('/:id', deleteOne);

router.get('/:recipeId/reviews', getAllReviews);
router.get('/:recipeId/reviews/:reviewId', getByReviewId);
router.post('/:recipeId/reviews', createReview);
router.put('/:recipeId/reviews/:reviewId', updateReview);
router.delete('/:recipeId/reviews/:reviewId', deleteReview);

export { router };
