
import express from "express";
import * as usersController from "./users.controller.js";

const router = express.Router();

router.get("/", usersController.getAll);

export default router;
