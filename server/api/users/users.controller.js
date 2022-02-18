"use strict";

import { getAll, getById, create, update, deleteOne } from "./users.service";

exports.getAll = async (req, res, next) => {
  try {
    const data = await getAll();
    res.status(200).send(data);
  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: "Failed to retrieve all users" });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const existingUser = await getById(req.params.id);
    if (existingUser) {
      // User was found by Id
      res.status(200);
      res.json(existingUser);
    } else {
      // User was not found
      res.status(404);
      res.json({ message: "Not Found" });
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: "Failed to retrieve user details" });
  }
};

exports.create = async (req, res, next) => {
  try {
    const id = await create(req.body);
    res.status(201).send({
      message: "User " + req.body.username + "created successfully",
      id: id,
    });
  } catch (error) {
    console.error(error);
    const errorName = error.name;
    const errorMessage = error.message;
    if (
      errorName === "InvalidFirstName" ||
      errorName === "InvalidLastName" ||
      errorName === "InvalidUserName" ||
      errorName === "InvalidEmail" ||
      errorName === "InvalidName" ||
      errorName === "UserAlreadyExists" ||
      errorName === "EmailAlreadyExists"
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
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    const errorName = error.name;
    const errorMessage = error.message;
    if (
      errorName === "InvalidFirstName" ||
      errorName === "InvalidLastName" ||
      errorName === "InvalidUserName" ||
      errorName === "InvalidEmail" ||
      errorName === "InvalidName"
    ) {
      res.status(400).send({ message: errorMessage });
    } else if (errorName === "UserNotExists") {
      res.status(404).send({ message: errorMessage });
    } else {
      res.status(500).send({ message: errorMessage });
    }
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const existingUser = await getById(req.params.id);
    if (existingUser) {
      await deleteOne(req.params.id);
      res.status(204).send();
    } else {
      // User was not found
      res.status(404);
      res.json({ message: "Not Found" });
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: "Failed to remove user" });
  }
};
