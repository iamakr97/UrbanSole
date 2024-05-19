const product = require('../models/productSchema');
const { uploadFileToCloudinary } = require('../Utils/fileUpload');

exports.addProduct = async (req, res) => {
    try {
        const { title, description, price, color, size, category, brand, model, idealFor, quantity } = req.body;

        if (!req.files || !req.files.file) {
            return res.status(400).json({
                success: false,
                message: "Please select an image ..."
            })
        }
        const file = req.files.file;

        if (!title || !description || !price || !color || !category || !brand || !model || !idealFor || !quantity || !file) {
            return res.status(400).json({
                success: false,
                message: "Please All the details..."
            })
        }

        const imageResponse = await uploadFileToCloudinary(file, 'UrbanSole', 80);
        const imageUrl = [];
        if (imageResponse.length > 1) {
            for (const img of imageResponse) {
                imageUrl.push(img.secure_url);
            }
        } else {
            imageUrl.push(imageResponse.secure_url);
        }

        const newProduct = new product({
            title,
            description,
            price,
            color,
            size,
            category,
            brand,
            model,
            idealFor,
            quantity,
            image: imageUrl.flat()
        });

        await newProduct.save();

        return res.status(200).json({
            success: true,
            newProduct
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server Error in Add new Product files",
            Error: error.message
        })
    }
}

exports.allProducts = async (req, res) => {
    try {
        const allProduct = await product.find({});
        return res.status(200).json({
            success: true,
            message: "all product fetched successfully",
            allProduct
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Inernal server Error in fetchin all products",
            Error: error.message
        })
    }
}

exports.featuredProducts = async (req, res) => {
    try {
        const featuredProducts = await product.find({}).limit(8);
        return res.status(200).json({
            success: true,
            message: "Featured product fetched successfully",
            featuredProducts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Inernal server Error in fetchin all products",
            Error: error.message
        })
    }
}

exports.fetchProductDetails = async (req, res) => {
    try {
        const productId = req.params.id;
        const prod = await product.findById(productId);
        return res.status(200).json({
            success: true,
            message: "Product Details Fetched Successfully",
            product: prod
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in fetching Product Details",
            Error: error.message
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        const startIndex = (page - 1) * limit;
        let query = {};
        if (req.query.category !== '') {
            query.category = req.query.category;
        }
        if (req.query.idealFor !== '') {
            query.idealFor = req.query.idealFor;
        }
        const priceMin = parseInt(req.query.priceMin);
        const priceMax = parseInt(req.query.priceMax);
        query.price = { $gte: priceMin, $lte: priceMax };

        const products = await product.find(query)
            .skip(startIndex)
            .limit(limit)
            .exec();

        const total = await product.countDocuments(query);

        const totalPages = Math.ceil(total / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        res.status(200).json({
            success: true,
            products,
            pagination: {
                totalPages,
                hasNextPage,
                hasPrevPage,
                currentPage: page
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


