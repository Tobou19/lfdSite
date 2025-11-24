const express = require("express");
const controller = require("../controllers/reservations.controller.js");

const router = express.Router();

router.get("/", controller.getAllReservations);
router.get("/:id", controller.getReservationById);
router.post("/create", controller.createReservation);
router.put("/update/:id", controller.updateReservation);
router.delete("/delete/:id", controller.deleteReservation);

module.exports = router;
