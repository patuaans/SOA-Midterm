const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
    tableId: {
        type: Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING'
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

module.exports = Order