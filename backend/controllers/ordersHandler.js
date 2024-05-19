const orders = require('../models/myOrders');

exports.myOrders = async (req, res) => {
    try {
        const { id } = req.user;
        const myOrders = await orders.find({ user: id })
            .sort({ _id: -1 })
            .populate('products.product');

        return res.status(200).json({
            success: true,
            message: "All orders fetched",
            myOrders
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in fetching All orders",
            Error: error.message
        })
    }
}

exports.allOrders = async (req, res) => {
    try {
        const allOrders = await orders.find().sort({_id: -1});
        return res.status(200).json({
            success: true,
            message: "All orders fetched",
            allOrders
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in fetching All orders",
            Error: error.message
        })
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        orders.findByIdAndUpdate({ _id, orderId },
            {
                status: status
            }
        )
        return res.status(200).json({
            success: true,
            message: "Order Updated Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in updating orders",
            Error: error.message
        })
    }
}