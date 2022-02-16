'use strict'

import { getAll, getById, create, update, deleteOne } from '../repository/recipe';

exports.getAll = async() => {
    return await getAll();
}

exports.getById = async(recipeId) => {
    return await getById(recipeId);
}


exports.create = async(data) => {
    await create(data);
}

exports.update = async(recipeId, data) => {
    await update(recipeId, data);
}

exports.deleteOne = async(recipeId) => {
    await deleteOne(recipeId);
}