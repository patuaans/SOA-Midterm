const express = require('express')
const router = express.Router()
const orderItemController = require('../controllers/orderItemController')

router.get('/', orderItemController.getOrderItems)
router.get('/:orderId', orderItemController.getOrderItem)
router.put('/addItem/:orderId', orderItemController.addItemsToOrder)
router.put('/changeStatus/:orderItemId', orderItemController.changeOrderItemStatus);


module.exports = router