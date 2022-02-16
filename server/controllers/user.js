'use strict'

import { getAll, getById } from '../repositories/user';

exports.getAll = async(req, res, next) => {
    try {
        let data = await getAll();
        res.status(200).send(data);
    } catch(ex) {
        console.log(ex)
        res.status(500).send({message: 'Failed to retrieve all users'});
    }
}

exports.getById = async(req, res, next) => {
    try {
        let data = await getById(req.params.id);
        res.status(200).send(data);
    } catch(ex) {
        console.log(ex)
        res.status(500).send({message: 'Failed to retrieve all users'});
    }
}