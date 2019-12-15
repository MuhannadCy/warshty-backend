//Abdulwahhab
const mongoose = require('mongoose')

const exampleSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phoneNumber: { type: String, minlength: 10, maxlength: 13 },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: { type: String },
  numberOfCars: Number,
}, { timestamps: true }
)

module.exports = mongoose.model('Customer', exampleSchema)
