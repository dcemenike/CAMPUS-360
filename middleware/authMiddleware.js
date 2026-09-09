const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const authMiddleware = async (req, res, next) => {
    const headers = req.headers.authorization;

    if (!headers || !headers.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    const token = headers.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    let admin;
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        admin = await Admin.findById(decoded.id).select('-password');
    }
    catch (error) {
        return res.status(401).json({ message: 'Not authorized, invalid/expired token' });
    }

    if (!admin) {
        return res.status(401).json({ message: 'Account no longer exists' });
    }

    req.user = admin;
    next();
}

module.exports = { authMiddleware }