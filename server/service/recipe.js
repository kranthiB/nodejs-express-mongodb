'use strict'

import { getAll, getById, create, update, deleteOne } from '../repository/recipe';
import { getById as getByUserId } from '../repository/user';
import { getById as getByReviewId } from '../repository/review';

let getRecipeReview = async(reviewId) => {
    let recipeReview = {}
    let review = await getByReviewId(reviewId)
    recipeReview.description = review.description
    recipeReview.rating = review.rating
    recipeReview.date = review.date
    let userDetail = await getByUserId(review.userId)
    recipeReview.user = userDetail.username
    return recipeReview
}

let getRecipe = async(recipe) => {
    let modifiedRecipe = {}
    modifiedRecipe.ingredients = recipe.ingredients
    modifiedRecipe.directions = recipe.directions
    modifiedRecipe.cookTime = recipe.cookTime
    modifiedRecipe.prepTime = recipe.prepTime
    modifiedRecipe.image = recipe.image
    modifiedRecipe.description = recipe.description
    modifiedRecipe.name = recipe.name
    modifiedRecipe._id = recipe._id
    let modifiedRecipeReviews = []
    for (let j=0; j< recipe.reviews.length; j++) {
        let modifiedRecipeReview = await getRecipeReview(recipe.reviews[j])
        modifiedRecipeReviews.push(modifiedRecipeReview)
    }
    modifiedRecipe.reviews = modifiedRecipeReviews
    return modifiedRecipe
}

exports.getAll = async() => {
    let recipes =  await getAll();
    let modifiedRecipes = []
    for (let i=0; i < recipes.length; i++) {
        let modifiedRecipe = await getRecipe(recipes[i])
        modifiedRecipes.push(modifiedRecipe)
    }
    return modifiedRecipes
}

exports.getById = async(recipeId) => {
    let recipe =  await getById(recipeId);
    return await getRecipe(recipe)
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