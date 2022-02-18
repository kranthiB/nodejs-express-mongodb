'use strict';

import { getAll, getById, create, update, deleteOne } from './recipes.service';

exports.getAll = async (req, res, next) => {
  try {
    let data = await getAll();
    res.status(200).send(data);
  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: 'Failed to retrieve all recipes' });
  }
};

exports.getById = async (req, res, next) => {
  try {
    let existingRecipe = await getById(req.params.id);
    if (existingRecipe) {
      // User was found by Id
      res.status(200);
      res.json(existingRecipe);
    } else {
      // User was not found
      res.status(404);
      res.json({ message: 'Not Found' });
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: 'Failed to retrieve recipe details' });
  }
};

exports.create = async (req, res, next) => {
  try {
    console.log('**** Enetroed Controller Create  ****');
    await create(req.body);
    res.status(201).send({ message: 'Recipe saved successfully' });
  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: 'Failed to save Recipe' });
  }
};

exports.update = async (req, res, next) => {
  try {
    await update(req.params.id, req.body);
    res.status(200).send({ message: 'Recipe updated successfully' });
  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: 'Failed to update Recipe' });
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    await deleteOne(req.params.id);
    res.status(204).send({ message: 'Recipe deleted successfully' });
  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: 'Failed to update Recipe' });
  }
};
