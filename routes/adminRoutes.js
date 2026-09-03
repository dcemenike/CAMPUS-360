const express = require('express')
const rateLimit = require('express-rate-limit');
const { registerAdmin, loginAdmin, getAllAdmins } = require('../controllers/adminController');
const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5,         //how many requests a single IP is allowed to make within that window before being blocked
    message: { message: "Too many login attempts. Please try again in 15 minutes."}

});

router.post('/', registerAdmin)
router.post('/login', loginLimiter, loginAdmin)
router.get('/', getAllAdmins)

module.exports = router;
