const mongoose = require('mongoose');

const myOrderListSchema = new mongoose.Schema({
    myOrders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('myOrderList', myOrderListSchema);