"use strict";

import { Types } from "mongoose";
import { User } from "./users.model";

exports.getAll = async () => {
  return await User.find({});
};

exports.getById = async (id) => {
  console.log("in repository getById" + id);
  if (Types.ObjectId.isValid(id)) {
    return await User.findById(id).exec();
  } else {
    return null;
  }
};

exports.create = async (data) => {
  const createdUser = await User.create(data);
  return createdUser._id;
};

exports.update = async (id, data) => {
  await User.replaceOne({ _id: id }, data);
};

exports.deleteOne = async (id) => {
  await User.deleteOne({ _id: id });
};

exports.getByUserName = async (userName) => {
  return await User.findOne({ username: userName }).exec();
};

exports.getByEmail = async (email) => {
  return await User.findOne({ email: email }).exec();
};
