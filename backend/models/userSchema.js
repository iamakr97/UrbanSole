const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    profileImage: {
        type: String,
    },
    address: [{
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
    }], 
    myOrderList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'myOrderList'
    },
    myCart: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'cart' 
    }
})

module.exports = mongoose.model('user', userSchema);