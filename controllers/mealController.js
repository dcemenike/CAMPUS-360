const Meal = require('../models/Meal');

//CREATE A NEW MEAL
const createMeal = async (req, res) => {
    try {
        const { name, description, price, category, isAvailable, imageUrl } = req.body;
        const newMeal = await Meal.create({
            name,
            description,
            price,
            category,
            isAvailable,
            imageUrl,
            lastUpdatedBy: req.user._id
        });
        res.status(201).json({
            message: 'Meal created successfully',
            meal: newMeal
        })
    }
    catch(error) {
        console.log('something went wrong', error.message);
        res.status(500).json({ message: 'something went wrong' }); 
    }
};

//VIEW ALL MEALS
const getAllMeals = async (req, res) => {
    try {
        const meals = await Meal.find().select('-lastUpdatedBy  -_id -__v');
        res.status(200).json({ message: 'Meals retrieved successfully', meals: meals });
    }
    catch(error) {
        console.log('something went wrong', error.message);
        res.status(500).json({ message: 'something went wrong' });
    }
}

//UPDATE MEAL AVAILABILITY
const updateMealAvailability = async (req, res) => {
    try{
        const { availability } = req.params;
        const { isAvailable } = req.body;

        if (typeof isAvailable !== 'boolean') {
            return res.status(400).json({ message: 'isAvailable must be a boolean value' });
        }   

        const updatedMeal = await Meal.findByIdAndUpdate(
            mealId, { isAvailable, lastUpdatedBy: req.user._id },
            { new: true, runValidators: true }
        );

        if(!updatedMeal) {
            return res.status(404).json({ message: 'Meal not found' });
    }
        res.status(200).json({ message: 'Meal availability updated successfully', meal: updatedMeal });
    }
    catch(error) {
        console.log('something went wrong', error.message);
        res.status(500).json({ message: 'something went wrong' });
    }
}

module.exports = { createMeal, getAllMeals, updateMealAvailability }