const express = require('express');
const router = express.Router();

const { signup, login, logout, sendOTP } = require('../controllers/auth');
const { auth, isAdmin, isUser } = require('../middlewares/auth');
const {
    myAccount,
    editProfile,
    addAddress,
    editProfilePic,
    editAddress,
    deleteAddress
} = require('../controllers/userAccount');

const { addProduct, allProducts, featuredProducts, fetchProductDetails, getAllProducts } = require('../controllers/productHandlers');
const { allCartItems, addToCart, removeFromCart } = require('../controllers/cartHandlers');
const { checkout, paymentVerification } = require('../controllers/paymentsHandler');
const { myOrders, allOrders, updateOrder } = require('../controllers/ordersHandler');
const { searchProduct } = require('../controllers/search');

router.post('/sendotp', sendOTP);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/myAccount', auth, isUser, myAccount);
router.post('/editProfile', auth, isUser, editProfile);
router.post('/editProfilePic', auth, isUser, editProfilePic);
router.post('/addAddress', auth, isUser, addAddress);
router.put('/editAddress/:addressId', auth, isUser, editAddress);
router.post('/deleteAddress/:addressId', auth, isUser, deleteAddress);


router.post('/addProduct', isAdmin, addProduct);
router.get('/allProducts', allProducts);
router.get('/featuredProducts', featuredProducts);
router.get('/product/:id', fetchProductDetails);
router.get('/products', getAllProducts);

router.post('/allCartItems', auth, isUser, allCartItems);
router.post('/addToCart/:productId', auth, isUser, addToCart);
router.post('/removeFromCart/:productId', auth, isUser, removeFromCart);


router.post('/checkout', auth, checkout);
router.post('/paymentVerification', auth, paymentVerification);

router.get('/myOrders', auth, isUser, myOrders);
router.get('/allOrders', auth, isAdmin, allOrders);
router.post('/updateOrder/:orderId', auth, isAdmin, updateOrder);


//search 
router.get('/search', searchProduct);

module.exports = router;