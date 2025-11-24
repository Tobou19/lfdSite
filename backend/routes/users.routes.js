const express = require("express");
const controller = require("../controllers/users.controller.js");

const router = express.Router();

// Routes CRUD pour utilisateurs
router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserById);
router.post("/create", controller.createUser);
router.put("/update/:id", controller.updateUser);
router.delete("/delete/:id", controller.removeUser);

module.exports = router;
