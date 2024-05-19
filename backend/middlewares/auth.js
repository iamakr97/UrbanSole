const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.header('Authorization').replace("Bearer ", "");

        if (!token || token === undefined) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Auth: Token is Missing"
                }
            )
        }
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
        } catch (error) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Token is Invalid",
                    error: error.message
                }
            );
        }
        next();
    } catch (error) {
        console.log("error in auth: ", error);
        return res.status(500).json(
            {
                success: false,
                message: "Something went Wrong while varifying token",
                error: error.message
            }
        );
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(401).json(
                {
                    success: false,
                    message: "This is Protected route for Admin"
                }
            );
        }
        next();
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "User role is not matching"
            }
        );
    }
}

exports.isUser = (req, res, next) => {
    try {
        if (req.user.role !== "User" && req.user.role !== "Admin") {
            return res.status(401).json(
                {
                    success: false,
                    message: "This is Protected Route for users"
                }
            );
        }
        next();

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "User Role is not matching",
                error: error.message
            }
        )
    }
}