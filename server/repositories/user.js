'use strict'

//https://mongoosejs.com/docs/queries.html

import { model } from 'mongoose';
const User = model('User');

exports.getAll = async() => {
    let res = await User.find({});
    return res;
}

exports.getById = async(id) => {
    let res = await User.findById(id).exec();
    return res;
}

exports.createUser = (data) => {
    let user = new User(data);
    user.save();
}