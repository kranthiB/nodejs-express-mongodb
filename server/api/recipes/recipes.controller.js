"use strict";

import { getAll, getById, create, update, deleteOne } from "./recipes.service";

exports.getAll = async (req, res, next) => {
  try {
    let data = await getAll();
    res.status(200).send(data);
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ message: ex.message });
  }
};

exports.getById = async (req, res, next) => {
  try {
    return await getById(req.params.id);
  } catch (error) {
    console.error(error);
    const errorName = error.name;
    const errorMessage = error.message;
    if (errorName === "ResourceNotExists") {
      res.status(404).send({ message: errorMessage });
    } else {
      res.status(500).send({ message: errorMessage });
    }
  }
};

exports.create = async (req, res, next) => {
  try {
    const id = await create(req.body);
    res.status(201).send({
      message: "Recipe " + req.body.name + " created successfully",
      id: id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

exports.update = async (req, res, next) => {
  try {
    await update(req.params.id, req.body);
    res
      .status(200)
      .send({ message: "Recipe - " + req.params.id + " updated successfully" });
  } catch (ex) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    await deleteOne(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    const errorName = error.name;
    const errorMessage = error.message;
    if (errorName === "ResourceNotExists") {
      res.status(404).send({ message: errorMessage });
    } else {
      res.status(500).send({ message: errorMessage });
    }
  }
};
