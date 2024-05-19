const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        enum: [5, 6, 7, 8, 9, 10],
    },
    category: {
        type: String,
        enum: ['Sports', 'Sneakers', 'Boots', 'Formals', 'Sandals', 'FlipFlops', 'Flats', 'Casuals']
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    idealFor: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
})

module.exports = mongoose.model('product', productSchema);
