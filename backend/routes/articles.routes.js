const express = require("express");
const controller = require("../controllers/articles.controller.js");

const router = express.Router();

// Routes pour articles
router.get("/", controller.getAllArticles);            // Tous les articles
router.get("/:id", controller.getArticleById);        // Un article précis
router.post("/create", controller.createArticle);     // Créer
router.put("/update/:id", controller.updateArticle);  // Mettre à jour
router.delete("/delete/:id", controller.removeArticle); // Supprimer

module.exports = router;
