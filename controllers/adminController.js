const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken')

// REGISTER NEW ADMIN ACCOUNT
const registerAdmin = async (req, res) => {
    try {
        const providedSecret = req.headers['x-register-secret'];

        if (!providedSecret || providedSecret !== process.env.REGISTER_SECRET) {
            return res.status(401).json({ message: "Not authorized to register an admin" });
        }

        const { email, username, password } = req.body;

        if (typeof email !== 'string' || typeof username !== 'string' || typeof password !== 'string') {    
            return res.status(400).json({ message: 'Invalid input' });
        }

        const newAdmin = await Admin.create({ email, username, password });

        res.status(201).json({
            message: "Admin registered successfully",
            admin: {
                id: newAdmin._id,
                email: newAdmin.email,
                username: newAdmin.username
            }
        });
    } catch (err) {
        console.log('something went wrong', err.message)
        res.status(500).json({
            message: "something went wrong"
        })
    }
}


// LOGIN ADMIN ACCOUNT
const loginAdmin = async (req, res) => {
    try {
        const {  username, password } = req.body

        if (typeof username !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const admin = await Admin.findOne({ username: username.toLowerCase() }).select('+password');

        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" })
        };

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" })
        };

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '6h' }
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

//GETTING ALL ADMINS
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().select('-password');
        res.status(200).json({ admins });
    }
    catch (error) {
        console.log('something went wrong', error.message);
        res.status(500).json({ message: 'something went wrong' });
    }
}


module.exports = { registerAdmin, loginAdmin, getAllAdmins };