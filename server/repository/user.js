'use strict'

//https://mongoosejs.com/docs/queries.html
//https://mongoosejs.com/docs/schematypes.html

import { model } from 'mongoose';
const User = model('User');

exports.getAll = async() => {
    return await User.find({});
}

exports.getById = async(id) => {
    return await User.findById(id).exec();
}

exports.create = async(data) => {
    let user = new User(data);
    let createdUser = await user.save();
    return createdUser._id;
}

exports.update = async(id, data) => {
    await User.replaceOne({ _id: id }, data)
}

exports.deleteOne = async(id) => {
    await User.deleteOne({ _id: id })
}

exports.getByUserName = async(userName) => {
    return await User.findOne({ username: userName }).exec();
}