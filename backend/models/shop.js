const mongoose = require('mongoose');

var shopSchema = new mongoose.Schema({
    shop: { type: String, required: true },
    owner: { type: String, required: true },
    area: { type: String },
    menu: [{
        name: { type: String, default: '', trim: true },
        price: { type: Number, default: '', trim: true },
        description: { type: String }
    }]
});

module.exports = mongoose.model('Shop', shopSchema, 'shops');