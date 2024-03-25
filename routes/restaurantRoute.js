const express = require("express")
const restaurantController = require("../controllers/restaurantController")

const router = express.Router()

router.get('/', restaurantController.createDefaultRestaurant)
// router.put('/updatetable/:numberOfTables', restaurantController.updateTableCount)

module.exports = router