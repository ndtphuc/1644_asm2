const mongoose = require('mongoose');
// var validator = require("email-validator");

var toySchema = new mongoose.Schema({
    toyName: {
        type: String,
        required: 'This field is required'
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    },
    supplier: {
        type: String
    },
    price: {
        type: String
    }
})


mongoose.model('Toy', toySchema);