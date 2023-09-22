const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    try {
        const token = req.body.token;
        console.log(req.body);

        if(!token) {
            return res.json({
                success: false,
                message: "Token is Missing",
            })
        }
        
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decode);
        req.user = decode;

        next();
    } catch(err) {
        return res.json({
            message: "Token is INVALID"
        })
    }
}

exports.admin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protect route for Admins,you can not access it"
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role 1 is not Matching"
        })
    }
}

exports.student = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protect route for students you can not access it"
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role 2 is not Matching"
        })
    }
}