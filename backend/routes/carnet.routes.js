const express = require("express");
const controller = require("../controllers/carnet.controller.js");

const router = express.Router();

router.get("/:id", controller.getCarnetByBeneficiaireId);
router.post("/create", controller.createCarnet);
router.put("/update/:id", controller.updateCarnetAppointments);

module.exports = router;
