const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken')

// REGISTER NEW ADMIN ACCOUNT
const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newAdmin = await Admin.create({ username, password });

        res.status(201).json({
            message: "Admin registered successfully",
            admin: {
                id: newAdmin.id,
                username: newAdmin.username,
                passwrord: newAdmin.password
            }
        });
    }catch (err) {
        console.log('something went wrong', err.message)
        res.status(500).json({
            message: "something went wrong"
        })
    }
}


// LOGIN ADMIN ACCOUNT

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({ message: "Invalid username or password" })
        };

        const isMatch = await admin.comparePassword( password );
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" })
        };

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            admin: {
                id: admin._id,
                username: admin.username
            }
        });
    } catch (error) {
        console.log('something went wrong', error.message);
        res.status(500).json({ message: 'something went wrong' });
    }
}


module.exports = { registerAdmin,    loginAdmin };