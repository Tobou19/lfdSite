const express = require("express");
const router = express.Router();
const multer = require("multer");
const productsController = require("../controllers/products.controller.js");

// 📤 Configure Multer for memory storage (buffer)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Format d'image invalide. Utilisez : jpg, png, gif, webp"));
  }
});

// 📋 Routes
router.get("/", productsController.getAll);
router.get("/:id", productsController.getOne);
router.post("/", upload.single('image'), productsController.create);
router.put("/:id", upload.single('image'), productsController.update);
router.delete("/:id", productsController.remove);

module.exports = router;