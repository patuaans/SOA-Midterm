const express = require('express')
const orderItemController = require('../controllers/orderItemController')
const router = express.Router()

router.get('/', orderItemController.getOrderItems)

router.get('/:orderId', orderItemController.getOrderItem)

router.put('/addItem/:orderId', orderItemController.addItemsToOrder)

router.put('/changeStatus/:orderItemId', orderItemController.changeOrderItemStatus);

module.exports = router