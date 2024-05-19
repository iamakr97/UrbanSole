const { instance } = require('../config/razorpay');
const crypto = require('crypto');
require('dotenv').config();
const orders = require('../models/myOrders');


exports.checkout = async (req, res) => {
    try {
        const { id } = req.user;
        const { totalAmount, products, address } = req.body;
        const options = {
            amount: totalAmount * 100,
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        console.log("Products", products);
        console.log('Address', address);
        console.log("id: ", id);
        const newOrder = new orders({
            products: products.map((product) => ({
                product: product.productId,
                price: product.price,
                quantity: product.quantity,
                color: product.color,
                size: product.size
            })),
            totalAmount: totalAmount,
            address: {
                street: address.street,
                city: address.city,
                state: address.state,
                zipCode: address.zipCode,
                phone: address.phone
            },
            status: 'Processing',
            orderId: order.id,
            user: id
        })
        await newOrder.save();

        res.status(200).json({
            success: true,
            message: "order created successfully",
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Enternal Server Error in creating Razorpay order",
            Error: error.message
        })
    }
}

exports.paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, products, address } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            res.redirect(
                `${process.env.BASE_URL}/user/payment`
            )
        } else {
            orders.findOneAndDelete({orderId: razorpay_order_id});
            res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error during payment verification",
            error: error.message
        });
    }
}