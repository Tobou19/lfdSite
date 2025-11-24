const express = require("express");
const controller = require("../controllers/team.controller.js");

const router = express.Router();

router.get("/", controller.getAllMembers);
router.post("/create", controller.createMember);
router.put("/update/:id", controller.updateMember);
router.delete("/delete/:id", controller.removeMember);

module.exports = router;
