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
  InvalidFirstName,
  InvalidLastName,
  InvalidUserName,
  InvalidEmail,
  InvalidName,
  UserAlreadyExists,
  EmailAlreadyExists,
  UserNotExists,
} from "./users.exception";

const validateUser = async (user) => {
  if (!user.name || typeof user.name !== "object") {
    throw new InvalidName("FirstName and LastName are required");
  }
  if (!user.name.firstName) {
    throw new InvalidFirstName("FirstName required");
  }
  if (!user.name.lastName) {
    throw new InvalidLastName("LastName required");
  }
  if (!user.username) {
    throw new InvalidUserName("UserName required");
  }
  if (!user.email) {
    throw new InvalidEmail("Email required");
  }
};

const validateNewUser = async (user) => {
  await validateUser(user);
  const existingUser = await getByUserName(user.username);
  if (existingUser !== null) {
    throw new UserAlreadyExists("User - " + user.username + " already exists");
  }
  const existingEmail = await getByEmail(user.email);
  if (existingEmail !== null) {
    throw new EmailAlreadyExists("Email - " + user.email + " already exists");
  }
};

const validateUpdateUser = async (id, user) => {
  const existingUser = await getById(id);
  if (existingUser === null) {
    throw new UserNotExists("User - " + id + " not exists");
  }
  await validateUser(user);
};

exports.getAll = async () => {
  return await getAll();
};

exports.getById = async (userId) => {
  return await getById(userId);
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
    throw new UserNotExists("User - " + userId + " not exists");
  }
  await deleteOne(userId);
};
