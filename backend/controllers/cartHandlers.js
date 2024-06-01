const cart = require('../models/cartSchema');
const user = require('../models/userSchema');
const Product = require('../models/productSchema');

exports.allCartItems = async (req, res) => {
    try {
        const { id } = req.user;
        const allCartItems = await cart.find({ user: id }).populate('cartItem.products');

        return res.status(200).json({
            success: true,
            message: "All cart items fetched successfully",
            allCartItems
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Inernal Server Error in fetching cart items",
            Error: error.message
        })
    }
}

exports.addToCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const { size } = req.body;
        const { id } = req.user;
       
        // Find the user and retrieve their cart
        const User = await user.findById(id);
        const cartId = User.myCart;

        // Find the product to be added
        const product = await Product.findById(productId);

        // Check if the product already exists in the cart
        const existingCartItem = await cart.findOne({
            _id: cartId,
            "cartItem.products": productId
        });

        if (existingCartItem) {
            return res.status(400).json({
                success: false,
                message: "Item is already in the cart"
            });
        }

        // If the product doesn't exist, add it to the cart
        const response = await cart.findOneAndUpdate(
            { _id: cartId },
            {
                $push: {
                    cartItem: {
                        products: productId,
                        quantity: 1,
                        price: product.price,
                        size: size
                    }
                },
                $inc: { totalPrice: product.price }
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Item added to cart",
            response
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const { id } = req.user;

        const myCart = await cart.findOne({ user: id });

        if (!myCart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const itemIndex = myCart.cartItem.findIndex(item => item.products.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }
        const removedItem = myCart.cartItem[itemIndex];
        myCart.cartItem.splice(itemIndex, 1);
        myCart.totalPrice -= removedItem.price * removedItem.quantity;
   
        await myCart.save();

        return res.status(200).json({
            success: true,
            message: "Item removed from cart successfully",
            myCart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            Error: error.message
        });
    }
}
