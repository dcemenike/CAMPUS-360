const express = require('express');
const { createMeal, getAllMeals, updateMealAvailability } = require('../controllers/mealController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createMeal);
router.get('/', getAllMeals);
router.patch('/:availability', authMiddleware, updateMealAvailability);

module.exports = router;