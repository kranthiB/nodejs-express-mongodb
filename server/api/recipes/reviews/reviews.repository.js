'use strict';

import { Review } from './reviews.model';

exports.getAll = async () => {
  let res = await Review.find({});
  return res;
};

exports.getById = async (id) => {
  let res = await Review.findById(id).exec();
  return res;
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
