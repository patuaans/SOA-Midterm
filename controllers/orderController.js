const Order = require('../models/order');
const Item = require('../models/item');
const OrderItem = require('../models/orderItem');

module.exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.addItemsToOrder = async (req, res) => {
    const { orderId } = req.params
    const itemsToAdd = req.body.items

    try {
        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).send('Order not found')
        }

        const orderItemsPromises = itemsToAdd.map(async item => {
            const itemDetails = await Item.findById(item.itemId)
            if (!itemDetails) {
                throw new Error(`Item not found: ${item.itemId}`)
            }

            const orderItem = new OrderItem({
                orderId: orderId,
                itemId: itemDetails._id,
                itemName: itemDetails.name,
                quantity: item.quantity,
                price: itemDetails.price
            })

            return orderItem.save()
        })

        const orderItems = await Promise.all(orderItemsPromises)

        res.status(201).json({
            message: 'Items added to order successfully',
            orderItems: orderItems
        })
    } catch (error) {
        if (error.message.includes('Item not found')) {
            res.status(404).send(error.message)
        } else {
            console.error('Error adding items to order:', error)
            res.status(500).send('Server error')
        }
    }
}