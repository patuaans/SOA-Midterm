const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.get('/orders', orderController.getOrders)
router.put('/addItem/:orderId', orderController.addItemsToOrder)
// router.put('/api/orders/status/:id', orderController.updateOrderStatus)

module.exports = router