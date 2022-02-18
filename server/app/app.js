"use strict";
import express from "express";
import { connect } from "mongoose";
import logger from "morgan";
import "core-js/stable";
import "regenerator-runtime/runtime";
import swaggerUI from "swagger-ui-express";
import { readFileSync } from "fs";
import path from "path";

import { CONNECTION_STRING } from "./config";

//load routes
import { router as usersRoute } from "../api/users/index";
import { router as recipesRoute } from "../api/recipes/index";

connect(CONNECTION_STRING);

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(logger("dev"));

app.use("/api/users", usersRoute);
app.use("/api/recipes", recipesRoute);

const swaggerBasePath =
  process.cwd() + path.sep + "server" + path.sep + "docs" + path.sep;
const swaggerData = readFileSync(swaggerBasePath + "swagger.json", "utf8");
const swaggerDocument = JSON.parse(swaggerData);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, null, null, null)
);

export default app;
