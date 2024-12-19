const user = require('../models/userSchema');
const OTP = require('../models/OTPSchema');
const cart = require('../models/cartSchema');
const myOrderList = require('../models/myOrderList');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { mailSender } = require('../Utils/mailSender');
const emailTemplate = require('../template/OTP_mail');
 

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please fill Email to register"
            })
        }
        const existingUser = await user.findOne({ email: email });
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User Already registered"
            })
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        const mailBody = emailTemplate(otp);
        await mailSender(email, otp, mailBody);

        await OTP.create({ email, otp });

        return res.status(200).json({
            success: true,
            message: "OTP Sent successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Please correct your email, otp cant send",
            Error: error.message
        })
    }
}
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role, profileImage, address, myOrders, myCart, otp } = req.body;
        if (!name || !email || !password || !otp) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details to register"
            })
        }
        

        const myOtp = await OTP.findOne({ email: email }).sort({ createdAt: -1 }).limit(1);
        
        if (myOtp.otp != otp) {
            return res.status(401).json({
                success: false,
                message: "Incorrect OTP"
            })
        }
        await OTP.deleteMany({ email });

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in encrypting password",
                error: err
            })
        }
        let newUser = new user({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: `https://ui-avatars.com/api/?name=${name}`,
            address: [],
            myOrders: null,
            myCart: null
        });
        await newUser.save();

        const newCart = await cart.create({
            user: newUser._id,
            cartItem: [],
            totalPrice: 0
        });

        const newOrderList = await myOrderList.create({
            myOrders: [],
            user: newUser._id
        })

        newUser = await user.findByIdAndUpdate(newUser._id,
            {
                myOrderList: newOrderList._id,
                myCart: newCart._id
            });

        return res.status(200).json({
            success: true,
            message: "User Registerd successfully",
            user: newUser
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User signup failed, Inernal server Error",
            error
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "Please fill all the details to Login"
            })
        }
        
        let logUser = await user.findOne({ email });
        if (!logUser) {
            return res.status(400).json({
                success: false,
                message: "User not found..."
            })
        }
        const payload = {
            email: logUser.email,
            name: logUser.name,
            id: logUser._id,
            role: logUser.role,
        }
        if (await bcrypt.compare(password, logUser.password)) {
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                });
            logUser = logUser.toObject();
            logUser.token = token;
            logUser.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'None',
                secure: true
            }
            res.cookie("token", token, options).status(200).json(
                {
                    success: true,
                    token: token,
                    user: logUser,
                    message: "User LoggedIn successfully"
                }
            );
        } else {
            return res.status(403).json(
                {
                    success: false,
                    message: "Password Incorrect"
                }
            );
        }
    } catch (error) {
        // console.log("Error in Login: ", error);
        return res.status(500).json(
            {
                success: false,
                message: 'Login failure',
                error: error.message
            }
        );
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        
        return res.status(200).json({
            success: true,
            message: "User Logged Out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}


