"use strict";

import mongoose from "mongoose";
let Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: {
    type: String,
  },
  amount: {
    type: String,
  },
});
const recipeSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  prepTime: {
    type: Number,
  },
  cookTime: {
    type: Number,
  },
  directions: {
    type: [String],
  },
  ingredients: {
    type: [ingredientSchema],
  },
  reviews: {
    type: [Schema.Types.ObjectId],
  },
});

let Recipe = mongoose.model("Recipe", recipeSchema);
export { Recipe };
