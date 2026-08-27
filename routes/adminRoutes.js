const express = require('express')
const { registerAdmin, loginAdmin, getAllAdmins } = require('../controllers/adminController');
const router = express.Router();

router.post('/', registerAdmin)
router.post('/login', loginAdmin)
router.get('/', getAllAdmins)

module.exports = router;
