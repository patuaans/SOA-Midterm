const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tableSchema = new Schema({
    seat_count: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['ACTIVE',  'INACTIVE']
    },
    isOccupied: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true})

const Table = mongoose.model('Table', tableSchema)

module.exports = Table