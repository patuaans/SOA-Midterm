const mongoose = require('mongoose')
const { Schema } = mongoose

const orderItemSchema = new Schema({
    categoryId: {
        type: String,
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
    itemStatus: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }
}, { timestamps: true })

const OrderItem = mongoose.model('OrderItem', orderItemSchema)

module.exports = OrderItem