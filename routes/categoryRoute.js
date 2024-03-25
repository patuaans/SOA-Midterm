const express = require("express");
const CategoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.updateById);
router.delete("/:id", CategoryController.deleteById);
router.get("/count/:id", CategoryController.countDistinctItem);
module.exports = router;