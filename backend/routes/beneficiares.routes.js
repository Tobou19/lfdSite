
const express = require("express");
const controller = require("../controllers/beneficiares.controller.js");

const router = express.Router();

router.get("/", controller.getBeneficiares);
router.get("/:id", controller.getBeneficiaresById);
router.post("/add", controller.createBeneficiares);
router.put("/:id", controller.updateBeneficiares);
router.delete("/:id", controller.removeBeneficiares);
router.post("/appointment/:id", controller.addAppointment);

module.exports = router;
