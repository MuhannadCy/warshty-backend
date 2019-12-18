const mongoose = require('mongoose')
const workOrderSchema = new mongoose.Schema({
  mechanic: { type: String, required: true },
  description: { type: String, required: true},
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  cost: {type: Number, required: true}
}, { timestamps: true }
)

module.exports = mongoose.model('WorkOrder', workOrderSchema)