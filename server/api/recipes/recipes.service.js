"use strict";

import {
  getAll,
  getById,
  create,
  update,
  deleteOne,
} from "./recipes.repository";
import { getById as getByUserId } from "../users/users.repository";
import {
  getById as getByReviewId,
  deleteOne as deleteReviewById,
} from "./reviews/reviews.repository";

import { InvalidAttribute, ResourceNotExists } from "../common.exception";

const getRecipeReview = async (reviewId) => {
  const recipeReview = {};
  const review = await getByReviewId(reviewId);
  recipeReview.description = review.description;
  recipeReview.rating = review.rating;
  recipeReview.date = review.date;
  recipeReview._id = reviewId;
  const userDetail = await getByUserId(review.userId);
  recipeReview.user = userDetail.username;
  return recipeReview;
};

const getRecipe = async (recipe) => {
  let modifiedRecipe = {};
  modifiedRecipe.ingredients = recipe.ingredients;
  modifiedRecipe.directions = recipe.directions;
  modifiedRecipe.cookTime = recipe.cookTime;
  modifiedRecipe.prepTime = recipe.prepTime;
  modifiedRecipe.image = recipe.image;
  modifiedRecipe.description = recipe.description;
  modifiedRecipe.name = recipe.name;
  modifiedRecipe._id = recipe._id;
  const modifiedRecipeReviews = [];
  for (let j = 0; j < recipe.reviews.length; j++) {
    let modifiedRecipeReview = await getRecipeReview(recipe.reviews[j]);
    modifiedRecipeReviews.push(modifiedRecipeReview);
  }
  modifiedRecipe.reviews = modifiedRecipeReviews;
  return modifiedRecipe;
};

const validateRecipe = async (recipe) => {
  if (!recipe) {
    throw new InvalidAttribute("Recipe required");
  }
  if (!recipe.name) {
    throw new InvalidAttribute("Recipe name required");
  }
  if (!recipe.description) {
    throw new InvalidAttribute("Recipe description required");
  }
  if (!recipe.image) {
    throw new InvalidAttribute("Recipe image required");
  }
  if (!recipe.prepTime) {
    throw new InvalidAttribute("Recipe prepTime required");
  }
  if (!recipe.cookTime) {
    throw new InvalidAttribute("Recipe cookTime required");
  }
  if (!recipe.directions) {
    throw new InvalidAttribute("Recipe directions required");
  }
  if (!recipe.ingredients) {
    throw new InvalidAttribute("Recipe ingredients required");
  }
};

exports.getAll = async () => {
  const recipes = await getAll();
  const modifiedRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    const modifiedRecipe = await getRecipe(recipes[i]);
    modifiedRecipes.push(modifiedRecipe);
  }
  return modifiedRecipes;
};

exports.getById = async (recipeId) => {
  const existingRecipe = await getById(recipeId);
  if (existingRecipe === null) {
    throw new ResourceNotExists("Recipe - " + recipeId + " not exists");
  } else {
    return await getRecipe(existingRecipe);
  }
};

exports.create = async (data) => {
  delete data.reviews;
  delete data.review;
  await validateRecipe(data);
  return await create(data);
};

exports.update = async (recipeId, data) => {
  const existingRecipe = await getById(recipeId);
  if (existingRecipe === null) {
    throw new ResourceNotExists("Recipe - " + recipeId + " not exists");
  } else {
    await validateRecipe(data);
    data.reviews = existingRecipe.reviews;
    await update(recipeId, data);
  }
};

exports.deleteOne = async (recipeId) => {
  const existingRecipe = await getById(recipeId);
  if (existingRecipe === null) {
    throw new ResourceNotExists("Recipe - " + recipeId + " not exists");
  } else {
    const recipe = await getById(recipeId);
    for (let i = 0; i < recipe.reviews.length; i++) {
      await deleteReviewById(recipe.reviews[i]);
    }
    await deleteOne(recipeId);
  }
};
