'use strict';

import { getAll, getById, create, update, deleteOne } from './users.repository';

exports.getAll = async () => {
  return await getAll();
};

exports.getById = async (userId) => {
  return await getById(userId);
};

exports.create = async (data) => {
  console.log('### Enetered Service Create ### ');
  await create(data);
};

exports.update = async (userId, data) => {
  await update(userId, data);
};

exports.deleteOne = async (userId) => {
  await deleteOne(userId);
};
