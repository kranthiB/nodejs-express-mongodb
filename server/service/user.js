'use strict'

import { getAll, getById, create, update, deleteOne } from '../repository/user';

exports.getAll = async() => {
    return await getAll();
}

exports.getById = async(userId) => {
    return await getById(userId);
}


exports.create = async(data) => {
    await create(data);
}

exports.update = async(userId, data) => {
    await update(userId, data);
}

exports.deleteOne = async(userId) => {
    await deleteOne(userId);
}