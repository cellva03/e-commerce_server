// importing the mongoose module and create a schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create a schema for the Sales
const salesSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    products:[
        {
           title: String,
            price: String,
            quantity: Number,
            category: String,
            description: String,
            stock: Number,
        }
    ],
    cost : {
        type: Number,
        required: true
    },  
    date: {
        type: Date,
        required: true
    }
})

// Create a model for the Sales
const Sales = mongoose.model('Sales', salesSchema);


// Export the model
module.exports = Sales;