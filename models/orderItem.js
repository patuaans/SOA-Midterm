const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderItemSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Preparing', 'Served', 'Cancelled'],
        default: 'Pending'
    }
}, {timestamps: true})

const OrderItem = mongoose.model('OrderItem', orderItemSchema)

module.exports = OrderItem