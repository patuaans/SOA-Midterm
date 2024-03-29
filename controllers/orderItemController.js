const OrderItem = require('../models/orderItem')
const Order = require("../models/order");
const Item = require("../models/item");

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

module.exports.addItemsToOrder = async (req, res) => {
    const { orderId } = req.params
    const itemsToAdd = req.body.items

    try {
        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).send('Order not found')
        }

        const orderItemsPromises = itemsToAdd.map(async item => {
            console.log(item.itemId)
            const itemDetails = await Item.findById(item.itemId)

            console.log(itemDetails)
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

module.exports.changeOrderItemStatus = async (req, res) => {
    const { orderItemId } = req.params;
    const { status } = req.body

    try {
        const orderItem = await OrderItem.findById(orderItemId)

        if (!orderItem) {
            return res.status(404).send('Order item not found')
        }

        if (!['Pending', 'Preparing', 'Served', 'Cancelled'].includes(status)) {
            return res.status(400).send('Invalid status')
        }

        orderItem.status = status
        await orderItem.save();

        res.status(200).json({
            message: 'Order item status updated successfully',
            orderItem: orderItem
        });
    } catch (error) {
        console.error('ChangeOrderItemStatusError:', error)
        res.status(500).send('Internal server error while updating order item status')
    }
}