//Abdulrhman

const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    shop_name: { type: String, required: true },
    shop_name: { type: String, required: true },
    shop_name: { type: String, required: true },
}, {
    timestamps: true
    });


const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;