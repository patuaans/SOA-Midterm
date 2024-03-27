const express = require('express')
const router = express.Router()
const orderItemController = require('../controllers/orderItemController')

router.get('/', orderItemController.getOrderItems)
router.get('/:orderId', orderItemController.getOrderItem)

module.exports = router