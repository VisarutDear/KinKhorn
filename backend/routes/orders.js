const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// order food
router.post('/food', (req, res, next) => {

    const order = new Order({
        food: req.body.food,        // .body simplify a complex message to a simple form
        price: req.body.price,
        user: req.body.user,
        shop: req.body.shop,
        quantity: req.body.quantity, 
        date: Date.now
      });
      order.save()
        .then(orderedFood => {
          res.status(201).json({
            postId: orderedFood._id,
            message: 'Food ordered sucessfully!'
          })
    });

});

module.exports = router;