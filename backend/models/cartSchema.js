const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    cartItem: [{
        products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
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
        size: {
            type: Number,
            enum: [5,6,7,8,9,10],
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('cart', cartSchema);