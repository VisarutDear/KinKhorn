const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    shopId: { type: String, required: true },
    userId: { type: String, required: true },
    orderTime: { type: Date, default: Date.now },
    recieveTime: { type: Date, default: null },
    orderList: [{
        foodId: { type: String, required: true, trim: true },
        food: { type: String, required: true, trim: true },
        price: { type: Number,  required: true },
        quantity: { type: Number, default: 1 }
    }],
})

module.exports = mongoose.model('Order', orderSchema, 'orders');