const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: 'A la carte restaurant'
    },
    address: {
        type: String,
        required: true,
        default: 'TDTU University'
    },
    tin: {
        type: String,
        required: true,
        default: '987-654-3210'
    },
    owner: {
        type: String,
        required: true,
        default: 'SOA Midterm'
    }
}, { timestamps: true })

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant