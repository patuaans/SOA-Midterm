const express = require("express")
const restaurantController = require("../controllers/restaurantController")
const router = express.Router()

router.route("/")
    .get(restaurantController.getRestaurantInfo)
    .post(restaurantController.createDefaultRestaurant)

module.exports = router