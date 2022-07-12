const mongoose = require('mongoose');

var supSchema = new mongoose.Schema({
    supName: {
        type: String,
        required: 'This field is required'
    },
    supAddress: {
        type: String
    },
})


mongoose.model('Supplier', supSchema);