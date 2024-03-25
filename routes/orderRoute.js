const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.get('/api/orders', orderController.getOrders)

router.put('/api/orders/status/:id', orderController.updateOrderStatus)

module.exports = router