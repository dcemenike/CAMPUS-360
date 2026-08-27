const express = require('express');
const { createMeal, getAllMeals } = require('../controllers/mealController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createMeal);
router.get('/', getAllMeals);

module.exports = router;