
import express from "express";
import * as appointmentsController from "./appointments.controller.js";

const router = express.Router();

router.get("/", appointmentsController.getAll);

export default router;
