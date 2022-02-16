'use strict'
import express from 'express';
import { connect } from 'mongoose';
import logger from 'morgan';
import "core-js/stable";
import "regenerator-runtime/runtime";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import { CONNECTION_STRING, SWAGGER_OPTIONS } from '../config/config';

//load models
import { User } from '../models/user'
import { Recipe } from '../models/recipe'
import { Review } from '../models/review'

//load routes
import indexRoute from '../routes';
import usersRoute from '../routes/users';
import recipesRoute from '../routes/recipe';
import reviewssRoute from '../routes/review'

connect(CONNECTION_STRING)

const app = express()
app.use(express.json({ limit: '5mb' }));
app.use(logger('dev'));

app.use('/api/', indexRoute);
app.use('/api/users', usersRoute);
app.use('/api/recipes', recipesRoute);
app.use('/api/recipes/:recipeId/reviews', reviewssRoute);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(SWAGGER_OPTIONS)));

export default app;