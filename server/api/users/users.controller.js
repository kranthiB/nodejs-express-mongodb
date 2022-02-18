'use strict';

import { getAll, getById, create, update, deleteOne } from './users.service';

exports.getAll = async (req, res, next) => {
  try {
    const data = await getAll();
    res.status(200).send(data);
  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: 'Failed to retrieve all users' });
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
      res.json({ message: 'Not Found' });
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: 'Failed to retrieve user details' });
  }
};

exports.create = async (req, res, next) => {
  try {
    console.log('**** Enetroed Controller Create  ****');
    await create(req.body);
    res.status(201).send({ message: 'User created successfully' });
  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: 'Failed to save user' });
  }
};

exports.update = async (req, res, next) => {
  try {
    console.log('**** Enetroed Controller update  ****');
    const existingUser = await getById(req.params.id);
    console.log('**** Enetroed Controller retreived  ****');
    if (existingUser) {
      await update(req.params.id, req.body);
      res.status(200).send({ message: 'User updated successfully' });
    } else {
      // User was not found
      res.status(404);
      res.json({ message: 'Not Found' });
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: 'Failed to update user' });
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
      res.json({ message: 'Not Found' });
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: 'Failed to remove user' });
  }
};
