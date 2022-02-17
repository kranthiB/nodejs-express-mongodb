'use strict'

import { create, update, deleteOne } from '../repository/review';
import { getByUserName } from '../repository/user';
import { addReviewToRecipe } from '../repository/recipe';

exports.create = async(recipeId, data) => {
    let user = await getByUserName(data.user);
    data.userId = user._id;
    data.recipeId = recipeId;
    data.date = new Date();
    let reviewId = await create(data);
    console.log(reviewId);
    await addReviewToRecipe(recipeId, reviewId)
}

exports.update = async(recipeId, reviewId, data) => {
    await update(reviewId, data);
}

exports.deleteOne = async(recipeId,reviewId) => {
    await deleteOne(reviewId);
}