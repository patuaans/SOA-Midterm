const OrderItem = require('../models/orderItem')
const Order = require("../models/order");
const Item = require("../models/item");

module.exports.getOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.find()
        res.status(200).json(orderItems)
    } catch (error) {
        console.error('GetOrderItemsError:', error)
        res.status(500).json({ message: "Failed to fetch order items", error: error.message })
    }
}

module.exports.getOrderItem = async (req, res) => {
    const { orderId } = req.params
    try {
        const orderItem = await OrderItem.find({ orderId: orderId})
        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }
        res.status(200).json(orderItem)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch the order item", error: error.message })
    }
}

module.exports.addItemsToOrder = async (req, res) => {
    const { orderId } = req.params
    const { items } = req.body

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        const orderItems = await Promise.all(items.map(async (item) => {
            const itemDetails = await Item.findById(item.itemId);
            if (!itemDetails) {
                throw new Error(`Item not found: ${item.itemId}`)
            }

            const orderItem = new OrderItem({
                orderId,
                itemId: itemDetails._id,
                itemName: itemDetails.name,
                quantity: item.quantity,
                price: itemDetails.price,
            })
            return orderItem.save()
        }))

        res.status(201).json({ message: 'Items added to order successfully', orderItems })
    } catch (error) {
        res.status(500).json({ message: "Failed to add items to order", error: error.message })
    }
}

module.exports.changeOrderItemStatus = async (req, res) => {
    const { orderItemId } = req.params
    const { status } = req.body

    try {
        const orderItem = await OrderItem.findById(orderItemId)
        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' })
        }
        if (!['Pending', 'Preparing', 'Served', 'Cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' })
        }

        orderItem.status = status
        await orderItem.save()

        res.status(200).json({ message: 'Order item status updated successfully', orderItem })
    } catch (error) {
        res.status(500).json({ message: "Failed to update order item status", error: error.message })
    }
}