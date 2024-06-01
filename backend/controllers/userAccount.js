const user = require('../models/userSchema');
const { isFileTypeSupported } = require('../Utils/fileUpload');
const { uploadFileToCloudinary } = require('../Utils/fileUpload');
const cloudinary = require('cloudinary').v2;

exports.myAccount = async (req, res) => {
    try {
        const { id } = req.user;
        let myProfile = await user.findById(id);
        myProfile.password = undefined;
        return res.status(200).json({
            success: true,
            message: "My account details fetched successfully",
            myAccount: myProfile
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in MyProfile",
            error: error.message
        })
    }
}

exports.editProfile = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) {
            return res.status(401).json({
                success: false,
                message: "Error occured, id missing, login agian"
            })
        }
        const { name, email } = req.body;

        await user.findByIdAndUpdate(id,
            {
                name,
                email
            });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server Error in Editing Profile...",
            Error: error.message
        })
    }
}

exports.editProfilePic = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) {
            return res.status(401).json({
                success: false,
                message: "Error occured, id missing, login agian"
            })
        }
        if (!req.files || !req.files.file) {
            return res.status(400).json({
                success: false,
                message: "Please select an image ..."
            })
        }
        let file = req.files.file;
        if (file.length && file.length > 1) {
            file = file[0];
        }
       

        const fileType = (file.name).split('.')[(file.name.split('.').length) - 1];
        const supportedTypes = ['jpg', 'jpeg', 'png'];

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(402).json({
                success: false,
                message: "file format is not supported"
            })
        }

        const response = await uploadFileToCloudinary(file, "UrbanSole", 80);

        const userProfile = await user.findById(id);
        const prevImageUrl = userProfile.profileImage;

        let prevPublicId = prevImageUrl.split('/').pop().split('.')[0];
        const result = await cloudinary.uploader.destroy(prevPublicId);

        await user.findByIdAndUpdate(id,
            {
                profileImage: response.secure_url
            })
        return res.status(200).json({
            success: true,
            message: "Profile image updated successfully",
            result
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server Error in Editing Profile...",
            Error: error.message
        })
    }
}

exports.editAddress = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) {
            return res.status(401).json({
                success: false,
                message: "Error occured, id missing, login agian"
            })
        }
        const { addressId } = req.params;
        const { street, city, state, zipCode, phone } = req.body;


        const updatedUser = await user.findOneAndUpdate(
            { _id: id, 'address._id': addressId },
            {
                $set: {
                    'address.$.street': street,
                    'address.$.city': city,
                    'address.$.state': state,
                    'address.$.zipCode': zipCode,
                    'address.$.phone': phone
                }
            },
            { new: true }
        );


        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            updatedUser
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server Error in Editing Address...",
            Error: error.message
        })
    }
}

exports.addAddress = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) {
            return res.status(401).json({
                success: false,
                message: "Error occured, id missing, login agian"
            })
        }
        const { street, city, state, zipCode, phone } = req.body;
        if (!street || !city || !state || !zipCode || !phone) {
            return res.status(401).json({
                success: false,
                message: "please fill all the details..."
            })
        }
        await user.findByIdAndUpdate(id,
            {
                $push: {
                    address: {
                        street, city, state, zipCode, phone
                    }
                }
            })
        return res.status(200).json({
            success: true,
            message: "Address Added successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server Error in Adding new Address...",
            Error: error.message
        })
    }
}

exports.deleteAddress = async (req, res) => {
    try {
        const { id } = req.user;
        const { addressId } = req.params;
        const myUser = await user.findById(id);


        if (!myUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const addressIndex = myUser.address.findIndex(addr => addr._id.toString() === addressId);


        if (addressIndex === -1) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        myUser.address.splice(addressIndex, 1);

        await myUser.save();

        res.status(200).json({
            success: true,
            message: "Address deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            seccess: false,
            message: "Internal server error",
            Error: error.message
        });
    }
}