const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    food: {type: String, required: true},
    price: {type: Number, required: true},
    user: {type: String, required: true},
    shop: {type: String, required: true},
    quantity: {type: Number, required: true}, 
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Order', orderSchema, 'orders');