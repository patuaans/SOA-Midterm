const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tableSchema = new Schema({
    tableId: {
        type: Number,
        unique: true,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['ACTIVE', 'INACTIVE', 'OCCUPIED'],
        default: 'INACTIVE'
    }
}, {timestamps: true})

const Table = mongoose.model('Table', tableSchema)

module.exports = Table