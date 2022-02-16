'use strict'

import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const userSchema = new Schema({
    fullName: {
        static: {
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            }
        }
    },
    userName: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    emailAddress: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});

const collectionName = 'user'
export default model('User', userSchema, collectionName);