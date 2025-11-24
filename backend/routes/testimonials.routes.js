const express = require("express");
const controller = require("../controllers/testimonials.controller.js");

const router = express.Router();

// Récupérer tous les témoignages
router.get("/", controller.getAll);

// Récupérer un témoignage par ID
router.get("/:id", controller.getOne);

// Créer un témoignage
router.post("/create", controller.create);

// Mettre à jour un témoignage
router.put("/update/:id", controller.update);

// Supprimer un témoignage
router.delete("/delete/:id", controller.remove);

module.exports = router;
