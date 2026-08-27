const mongoose = require('mongoose');
const mealSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A meal must have a name'],
            trim: true,
            unique: true,
        },
        description: {
            type: String,
            required: [true, 'A meal must have a description'], 
            trim: true,
            maxlength: [300, 'Description cannot exceed 300 characters'],
        },
        price: {
            type: Number,
            required: [true, 'A meal must have a price'],
            min: [0, 'Price cannot be negative'],
        },
        category: {
            type: String,
            required: [true, 'A meal must belong to a category'],

            enum: {
                values: [ 'Main Dish', 'Snacks', 'Drinks', 'Sides', 'Protein'],
                message: '{VALUE} is not a valid category.'
            },  
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        imageUrl: {
            type: String,
            required: [true, 'A meal image URL is required.'],
            // default: 'https://via.placeholder.com/150'
        },
        lastUpdatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true
        }
    },
    {timestamps: true,}
);      
    const Meal = mongoose.model('Meal', mealSchema);
    module.exports = Meal;