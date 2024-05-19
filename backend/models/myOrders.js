const mongoose = require('mongoose');

const myOrdersSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        color: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: Number,
            required: true
        },
        phone: {
            type: Number,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['Processing', 'InTransit', 'Delivered'],
        default: 'Processing'
    },
    orderId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('orders', myOrdersSchema);
