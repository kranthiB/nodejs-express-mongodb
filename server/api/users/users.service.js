"use strict";

import {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  getByUserName,
  getByEmail,
} from "./users.repository";

import {
  InvalidAttribute,
  AttributeAlreadyExists,
  ResourceNotExists,
} from "../common.exception";

const validateUser = async (user) => {
  if (!user.name || typeof user.name !== "object") {
    throw new InvalidAttribute("FirstName and LastName are required");
  }
  if (!user.name.firstName) {
    throw new InvalidAttribute("FirstName required");
  }
  if (!user.name.lastName) {
    throw new InvalidAttribute("LastName required");
  }
  if (!user.username) {
    throw new InvalidAttribute("UserName required");
  }
  if (!user.email) {
    throw new InvalidAttribute("Email required");
  }
};

const validateNewUser = async (user) => {
  await validateUser(user);
  const existingUser = await getByUserName(user.username);
  if (existingUser !== null) {
    throw new AttributeAlreadyExists(
      "User - " + user.username + " already exists"
    );
  }
  const existingEmail = await getByEmail(user.email);
  if (existingEmail !== null) {
    throw new AttributeAlreadyExists(
      "Email - " + user.email + " already exists"
    );
  }
};

const validateUpdateUser = async (id, user) => {
  const existingUser = await getById(id);
  if (existingUser === null) {
    throw new ResourceNotExists("User - " + id + " not exists");
  }
  await validateUser(user);
};

exports.getAll = async () => {
  return await getAll();
};

exports.getById = async (userId) => {
  const existingUser = await getById(userId);
  if (existingUser === null) {
    throw new ResourceNotExists("User - " + userId + " not exists");
  } else {
    return existingUser;
  }
};

exports.create = async (data) => {
  await validateNewUser(data);
  return await create(data);
};

exports.update = async (userId, data) => {
  await validateUpdateUser(userId, data);
  await update(userId, data);
};

exports.deleteOne = async (userId) => {
  const existingUser = await getById(userId);
  if (existingUser === null) {
    throw new ResourceNotExists("User - " + userId + " not exists");
  }
  await deleteOne(userId);
};
