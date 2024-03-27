const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
            type: String,
            unique: true,
            required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
            type: String,
            required: true
    },
    imageUrl: {
        type: String,
        default: '',
        required: false
    }   
}, {timestamps: true});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;