"use strict";
import express from "express";
import * as controller from "./users.controller";

const router = express.Router();

// GET methods
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

// POST method
router.post("/", controller.create);

// PUT method
router.put("/:id", controller.update);

// DELETE method
router.delete("/:id", controller.deleteOne);

export { router };
