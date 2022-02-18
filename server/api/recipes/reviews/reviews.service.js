"use strict";

import { create, update, deleteOne } from "./reviews.repository";
import { getByUserName } from "../../users/users.repository";
import {
  addReviewToRecipe,
  replaceReviews,
  getById as getByRecipeId,
} from "../recipes.repository";

let getReview = async (recipeId, data) => {
  let user = await getByUserName(data.user);
  data.userId = user._id;
  data.recipeId = recipeId;
  data.date = new Date();
  delete data.user;
};
exports.create = async (recipeId, data) => {
  await getReview(recipeId, data);
  let reviewId = await create(data);
  await addReviewToRecipe(recipeId, reviewId);
};

exports.update = async (recipeId, reviewId, data) => {
  await getReview(recipeId, data);
  await update(reviewId, data);
};

exports.deleteOne = async (recipeId, reviewId) => {
  let recipe = await getByRecipeId(recipeId);
  let reviews = recipe.reviews;
  let reviewIndex = reviews.indexOf(reviewId);
  if (reviewIndex !== -1) {
    reviews.splice(reviewIndex, 1);
  }
  await replaceReviews(recipeId, reviews);
  await deleteOne(reviewId);
};
