<<<<<<< HEAD
//Abdulwahhab
=======
//Abdulwahhab
const mongoose = require('mongoose')

const exampleSchema = new mongoose.Schema({
  customerName: {type: String, required: true},
  phoneNumber: {type: String, minlength: 10, maxlength: 13},
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {type:String },
  numberOfCars: Number,
}, {timestamps: true}
)

module.exports = mongoose.model('Customer', exampleSchema)
>>>>>>> 803ab68689331f8895f789b3d01b7a04eeabb35f
