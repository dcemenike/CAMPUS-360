const express = require('express');
const { createMeal, getAllMeals, updateMealAvailability, deleteMeal } = require('../controllers/mealController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createMeal);
router.get('/', getAllMeals);
router.patch('/:mealId', authMiddleware, updateMealAvailability);
router.delete('/:mealId', authMiddleware, deleteMeal);

module.exports = router;