const OrderItem = require('../models/orderItem')

module.exports.getOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.find()
        res.status(200).json(orderItems)
    } catch (error) {
        console.error('GetOrderItemsError:', error)
        res.status(500).send('Internal server error while fetching order items')
    }
}

module.exports.getOrderItem = async (req, res) => {
    try {
        const orderId = req.params.orderItemId;
        const orderItem = await OrderItem.find({ orderId: orderId})

        if (!orderItem) {
            return res.status(404).send('Order item not found')
        }
        res.status(200).json(orderItem)
    } catch (error) {
        console.error('GetOrderItemError:', error)
        res.status(500).send('Internal server error while fetching an order item')
    }
}
