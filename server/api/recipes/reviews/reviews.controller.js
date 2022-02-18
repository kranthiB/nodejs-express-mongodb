"use strict";

import { getAll, getById, create, update, deleteOne } from "./reviews.service";

exports.getAll = async (req, res, next) => {
  try {
    let data = await getAll(req.params.recipeId);
    res.status(200).send(data);
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ message: ex.message });
  }
};

exports.getById = async (req, res, next) => {
  try {
    let data = await getById(req.params.recipeId, req.params.reviewId);
    res.status(200).send(data);
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ message: ex.message });
  }
};

exports.create = async (req, res, next) => {
  try {
    const id = await create(req.params.recipeId, req.body);
    res.status(201).send({
      message: "Review by" + req.body.user + " saved successfully",
      id: id,
    });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ message: ex.message });
  }
};

exports.update = async (req, res, next) => {
  try {
    await update(req.params.recipeId, req.params.reviewId, req.body);
    res.status(200).send({ message: "Review updated successfully" });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ message: ex.message });
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    await deleteOne(req.params.recipeId, req.params.reviewId);
    res.status(204).send({ message: "Review deleted successfully" });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ message: ex.message });
  }
};
