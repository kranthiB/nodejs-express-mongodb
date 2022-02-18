'use strict';

import { User } from './users.model';

exports.getAll = async () => {
  return await User.find({});
};

exports.getById = async (id) => {
  return await User.findById(id).exec();
};

exports.create = async (data) => {
  console.log('@@@ Enetroed Repository Create  @@@');
  const createdUser = await User.create(data);
  console.log('@@@ User Created  @@@');
  return createdUser._id;
};

exports.update = async (id, data) => {
  console.log('@@@ Enetroed Repository Update  @@@');
  await User.replaceOne({ _id: id }, data);
  console.log('@@@ User updated  @@@');
};

exports.deleteOne = async (id) => {
  await User.deleteOne({ _id: id });
};

exports.getByUserName = async (userName) => {
  return await User.findOne({ username: userName }).exec();
};
