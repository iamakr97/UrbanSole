const Product = require('../models/productSchema');

exports.searchProduct = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                status: false,
                message: 'Query is required'
            });
        }
        const results = await Product.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
                { brand: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json({
            success: true,
            message: "Search Product find successfully",
            results
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}