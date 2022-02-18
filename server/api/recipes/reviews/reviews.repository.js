"use strict";

import { Review } from "./reviews.model";
import { Types } from "mongoose";

exports.getAll = async () => {
  let res = await Review.find({});
  return res;
};

exports.getById = async (id) => {
  if (Types.ObjectId.isValid(id)) {
    return await Review.findById(id).exec();
  } else {
    return null;
  }
};

exports.create = async (data) => {
  let review = new Review(data);
  let createdReview = await review.save();
  return createdReview._id;
};

exports.update = async (id, data) => {
  await Review.replaceOne({ _id: id }, data);
};

exports.deleteOne = async (id) => {
  await Review.deleteOne({ _id: id });
};
