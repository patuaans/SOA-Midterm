const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.get('/orders', orderController.getOrders)
router.get('/orderTotal/:orderId', orderController.calculateOrderTotal);

module.exports = router