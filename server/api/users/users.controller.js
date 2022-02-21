"use strict";

import { getAll, getById, create, update, deleteOne } from "./users.service";

exports.getAll = async (req, res, next) => {
  try {
    const data = await getAll();
    res.status(200).send(data);
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ message: ex.message });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await getById(req.params.id);
    res.status(200).send(data);
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
      message: "User " + req.body.username + " created successfully",
      id: id,
    });
  } catch (error) {
    console.error(error);
    const errorName = error.name;
    const errorMessage = error.message;
    if (
      errorName === "InvalidAttribute" ||
      errorName === "AttributeAlreadyExists"
    ) {
      res.status(400).send({ message: errorMessage });
    } else {
      res.status(500).send({ message: errorMessage });
    }
  }
};

exports.update = async (req, res, next) => {
  try {
    await update(req.params.id, req.body);
    res
      .status(200)
      .send({ message: "User " + req.params.id + " updated successfully" });
  } catch (error) {
    console.error(error);
    const errorName = error.name;
    const errorMessage = error.message;
    if (errorName === "InvalidAttribute") {
      res.status(400).send({ message: errorMessage });
    } else if (errorName === "ResourceNotExists") {
      res.status(404).send({ message: errorMessage });
    } else {
      res.status(500).send({ message: errorMessage });
    }
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
