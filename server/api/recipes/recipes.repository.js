"use strict";

import { Recipe } from "./recipes.model";
import { Types } from "mongoose";

exports.getAll = async () => {
  return await Recipe.find({});
};

exports.getById = async (id) => {
  if (Types.ObjectId.isValid(id)) {
    return await Recipe.findById(id).exec();
  } else {
    return null;
  }
};

exports.create = async (data) => {
  let createdRecipe = await Recipe.create(data);
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
