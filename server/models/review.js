'use strict'

import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const reviewSchema = new Schema({
});

const collectionName = 'review'
export default model('Review', reviewSchema, collectionName);