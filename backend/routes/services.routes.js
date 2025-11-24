const express = require("express");
const controller = require("../controllers/services.controller.js");

const router = express.Router();

// Récupérer tous les services
router.get("/", controller.getAll);

// Récupérer un service par ID
router.get("/:id", controller.getOne);

// Créer un service
router.post("/create", controller.create);

// Mettre à jour un service
router.put("/update/:id", controller.update);

// Supprimer un service
router.delete("/delete/:id", controller.remove);

module.exports = router;
