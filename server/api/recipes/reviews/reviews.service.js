"use strict";

import { create, update, deleteOne } from "./reviews.repository";
import { getByUserName } from "../../users/users.repository";
import {
  addReviewToRecipe,
  replaceReviews,
  getById as getByRecipeId,
} from "../recipes.repository";
import { InvalidAttribute, ResourceNotExists } from "../common.exception";

const getReview = async (recipeId, data) => {
  const user = await getByUserName(data.user);
  if (user === null) {
    throw new ResourceNotExists("User - " + data.user + " not exists");
  } else {
    data.userId = user._id;
    data.recipeId = recipeId;
    data.date = new Date();
    delete data.user;
  }
};

const validateReview = async (review) => {
  if (!review.description) {
    throw new InvalidAttribute("Review description required");
  }
  if (!review.rating) {
    throw new InvalidAttribute("Review rating required");
  }
  if (!review.user) {
    throw new InvalidAttribute("Review user required");
  }
};
exports.create = async (recipeId, data) => {
  await validateReview(data);
  await getReview(recipeId, data);
  const reviewId = await create(data);
  await addReviewToRecipe(recipeId, reviewId);
};

exports.update = async (recipeId, reviewId, data) => {
  await validateReview(data);
  await getReview(recipeId, data);
  await update(reviewId, data);
};

exports.deleteOne = async (recipeId, reviewId) => {
  const recipe = await getByRecipeId(recipeId);
  if (recipe === null) {
    throw new ResourceNotExists("Recipe - " + recipeId + " not exists");
  } else {
    const reviews = recipe.reviews;
    const reviewIndex = reviews.indexOf(reviewId);
    if (reviewIndex !== -1) {
      reviews.splice(reviewIndex, 1);
    } else {
      throw new ResourceNotExists("Review - " + reviewId + " not exists");
    }
    await replaceReviews(recipeId, reviews);
    await deleteOne(reviewId);
  }
};
