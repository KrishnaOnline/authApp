const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signup = async(req, res) => {
    try {
        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.json({
                success: false,
                message: "User Already Exists",
            })
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch(err) {
            return res.json({
                success: false,
                message: "Error in Hashing Password"
            })
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        })

        return res.status(200).json({
            success: true,
            user: user,
            message: "User Signed Up Successfully"
        })

    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error Signing Up User",
        })
    }
}

exports.login = async(req, res) => {
    const {email, password} = req.body;
}