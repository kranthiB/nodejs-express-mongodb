"use strict";

import { Recipe } from "./recipes.model";

exports.getAll = async () => {
  return await Recipe.find({});
};

exports.getById = async (id) => {
  return await Recipe.findById(id).exec();
};

exports.create = async (data) => {
  console.log("**** Enetroed Repository Create  ****");
  let createdRecipe = await Recipe.create(data);
  console.log("**** Recipe Created  ****");
  return createdRecipe._id;
};

exports.update = async (id, data) => {
  await Recipe.replaceOne({ _id: id }, data);
};

exports.deleteOne = async (id) => {
  await Recipe.deleteOne({ _id: id });
};

exports.addReviewToRecipe = async (id, reviewId) => {
  let recipe = await Recipe.findById(id).exec();
  recipe.reviews.push(reviewId);
  await Recipe.replaceOne({ _id: recipe._id }, recipe);
};

exports.replaceReviews = async (id, reviews) => {
  await Recipe.updateOne({ _id: id }, { reviews: reviews });
};
