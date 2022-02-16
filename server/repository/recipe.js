'use strict'

import { model } from 'mongoose';
const Recipe = model('Recipe');

exports.getAll = async() => {
    let res = await Recipe.find({});
    return res;
}

exports.getById = async(id) => {
    let res = await Recipe.findById(id).exec();
    return res;
}

exports.create = async(data) => {
    let recipe = new Recipe(data);
    await recipe.save();
}

exports.update = async(id, data) => {
    await Recipe.replaceOne({ _id: id }, data)
}

exports.deleteOne = async(id) => {
    await Recipe.deleteOne({ _id: id })
}