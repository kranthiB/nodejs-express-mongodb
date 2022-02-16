'use strict'

import { Int32 } from 'mongodb';
import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const ingredientSchema = new Schema({
    name: {
        type: String
    },
    amount: {
        type: String
    }
})
const recipeSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    prepTime: {
        type: Number
    },
    cookTime: {
        type: Number
    },
    directions: {
        type: [String]
    },
    ingredients: {
        type: [ingredientSchema]
    },
    reviews: {
        type: [_Schema.Types.ObjectId]
    }
    
});

const collectionName = 'recipe'
export default model('Recipe', recipeSchema, collectionName);