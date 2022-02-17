'use strict'

import { getAll, getById, create, update, deleteOne } from '../service/review';

exports.getAll = async(req, res, next) => {
    try {
        let data = await getAll(req.params.recipeId);
        res.status(200).send(data);
    } catch(ex) {
        console.log(ex)
        res.status(500).send({message: 'Failed to retrieve all reviews'});
    }
}

exports.getById = async(req, res, next) => {
    try {
        let data = await getById(req.params.recipeId, req.params.reviewId);
        res.status(200).send(data);
    } catch(ex) {
        console.log(ex)
        res.status(500).send({message: 'Failed to retrieve reviews details'});
    }
}


exports.create = async(req, res, next) => {
    try {
        await create(req.params.recipeId, req.body);
        res.status(201).send({message: 'Review saved successfully'});
    } catch(ex) {
        console.log(ex)
        res.status(500).send({message: 'Failed to save Review'});
    }
}

exports.update = async(req, res, next) => {
    try {
        await update(req.params.recipeId, req.params.reviewId, req.body);
        res.status(200).send({message: 'Review updated successfully'});
    } catch(ex) {
        console.log(ex)
        res.status(500).send({message: 'Failed to update Review'});
    }
}

exports.deleteOne = async(req, res, next) => {
    try {
        await deleteOne(req.params.recipeId, req.params.reviewId);
        res.status(204).send({message: 'Review deleted successfully'});
    } catch(ex) {
        console.log(ex)
        res.status(500).send({message: 'Failed to update Review'});
    }
}