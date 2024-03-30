const express = require('express')
const orderController = require('../controllers/orderController')
const router = express.Router()

router.get('/', orderController.getOrders)

router.get('/total/:orderId', orderController.calculateOrderTotal)

module.exports = router