"use strict";

import mongoose from "mongoose";
let Schema = mongoose.Schema;

const reviewSchema = new Schema({
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
  date: {
    type: Date,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
  recipeId: {
    type: Schema.Types.ObjectId,
  },
});

let Review = mongoose.model("Review", reviewSchema);
export { Review };
