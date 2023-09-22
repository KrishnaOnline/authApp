const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fill all the Details",
            })
        }

        let user = await User.findOne({email});

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User DoNot Exist, Please SignUp"
            })
        }

        const passCheck = await bcrypt.compare(password, user.password);

        const payload = {
            email: user.email,
            role: user.role,
            id: user._id,
        }

        if(passCheck) {
            let token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            console.log(user);

            res.cookie('token', token).status(200).json({
                success: true,
                token,
                user,
                message: "User LoggedIn Successfully",
            })
        } else {
            return res.status(403).json({
                success: false,
                message: "Incorrect Password",
            })
        }

    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error Logging In",
        })
    }
}