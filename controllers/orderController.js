const Order = require('../models/order')
const OrderItem = require('../models/orderItem')

module.exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.calculateOrderTotal = async (req, res) => {
    const { orderId } = req.params

    try {
        const orderItems = await OrderItem.find({ orderId: orderId, status: 'Served' })

        if (orderItems.length === 0) {
            return res.status(404).json({ message: 'No served items found for this order' })
        }

        const total = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

        res.status(200).json({
            orderId: orderId,
            total: total,
            currency: "VND"
        })

    } catch (error) {
        console.error('CalculateOrderTotalError:', error);
        res.status(500).send('Internal server error while calculating order total')
    }
}