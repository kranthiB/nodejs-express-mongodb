'use strict'

import { model } from 'mongoose';
const Recipe = model('Recipe');

exports.getAll = async() => {
    return await Recipe.find({});
}

exports.getById = async(id) => {
    return await Recipe.findById(id).exec();
}

exports.create = async(data) => {
    let recipe = new Recipe(data);
    let createdRecipe = await recipe.save();
    return createdRecipe._id
}

exports.update = async(id, data) => {
    await Recipe.replaceOne({ _id: id }, data)
}

exports.deleteOne = async(id) => {
    await Recipe.deleteOne({ _id: id })
}

exports.addReviewToRecipe = async(id, reviewId) => {
    let recipe = await Recipe.findById(id).exec();
    recipe.reviews.push(reviewId)    
    await Recipe.replaceOne({ _id: recipe._id }, recipe)
}