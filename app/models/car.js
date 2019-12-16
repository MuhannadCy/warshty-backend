//Abdulrhman

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    VIN: { type: String, required: true },
    carPlat: { type: String, required: true, maxlength: 7 },
    color: { type: String, required: true },
    year: { type: String, required: true },
    model: { type: String, required: true },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
}, {
        timestamps: true
    });


const Car = mongoose.model('Car', carSchema);

module.exports = Car;