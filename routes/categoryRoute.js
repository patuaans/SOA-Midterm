const express = require("express")
const categoryController = require("../controllers/categoryController")
const router = express.Router()

router.route("/")
    .get(categoryController.getAll)
    .post(categoryController.create)

router.route("/:id")
    .get(categoryController.getById)
    .put(categoryController.updateById)
    .delete(categoryController.deleteById)

router.get("/count/:id", categoryController.countDistinctItem)

module.exports = router