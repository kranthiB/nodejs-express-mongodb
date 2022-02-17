'use strict'

import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const reviewSchema = new Schema({
    description: {
        type: String
    },
    rating: {
        type: Number
    },
    date: {
        type: Date
    },
    userId: {
        type: _Schema.Types.ObjectId
    },
    recipeId: {
        type: _Schema.Types.ObjectId
    }
});

const collectionName = 'review'
export default model('Review', reviewSchema, collectionName);