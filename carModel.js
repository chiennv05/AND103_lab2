const mongoose = require('mongoose');
const { type } = require('os');

const CarSchema = new mongoose.Schema({
    ten: {
        type: String,
        require: true
    },
    namSX: {
        type: Number
     
    },
    hang: {
        type: String,
        require: true
    },
    gia: {
        type: Number,
    }
});

const CarModel = new mongoose.model('test', CarSchema);

module.exports = CarModel;
