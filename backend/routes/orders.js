const express = require('express');
const Order = require('../models/order');
const app_api = require('../app');

const router = express.Router();
const expiration = 3600; // second units

// order food
router.post('/', async (req, res, next) => {
  try {
    const order = new Order({
        shopId: req.body.shopId,        // .body simplify a complex message to a simple form
        userId: req.body.userId,
        orderTime: Date.now,
        recieveTime: req.body.recieveTime,
        orderList: req.body.orderList
      });
    order.save()
      .then(orderedFood => {
        res.status(201).json({
          postId: orderedFood._id,
          message: 'Food ordered sucessfully!'
        })
    });

    await app_api.redis.set(orderedFood._id, JSON.stringify(result), 'EX', expiration, () => { console.log("sucessfully update order!") });

  } catch (e) {
    console.error("unable to store food order", e);
    res.status(400).json({
    success: false,
    message: e
  });
  }
});

module.exports = router;