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

exports.create = async(data) => {
    let user = new User(data);
    await user.save();
}

exports.update = async(id, data) => {
    await User.replaceOne({ _id: id }, data)
}

exports.deleteOne = async(id) => {
    await User.deleteOne({ _id: id })
}