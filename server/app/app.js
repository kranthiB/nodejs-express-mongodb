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
import { User } from '../model/user'
import { Recipe } from '../model/recipe'
import { Review } from '../model/review'

//load routes
import indexRoute from '../route';
import usersRoute from '../route/users';
import recipesRoute from '../route/recipe';

connect(CONNECTION_STRING)

const app = express()
app.use(express.json({ limit: '5mb' }));
app.use(logger('dev'));

app.use('/api/', indexRoute);
app.use('/api/users', usersRoute);
app.use('/api/recipes', recipesRoute);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(SWAGGER_OPTIONS)));

export default app;