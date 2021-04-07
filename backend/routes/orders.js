const express = require('express');
const Order = require('../models/order');
const app_api = require('../app');

const router = express.Router();
const expiration = 3600 * 24; // second units

// order food
router.post('/customer', async (req, res, next) => {
  try {
    const order = new Order({
        shopId: req.body.shopId,        // .body simplify a complex message to a simple form
        userId: req.body.userId,
        orderTime: Date.now(),
        recieveTime: req.body.recieveTime,
        orderList: req.body.orderList
      });
    order.save()
      .then(orderedFood => {
        res.status(201).json({
          orderId: orderedFood._id,
          message: 'Food ordered sucessfully!'
        })
    });

    // update that frontstore queue 
    let frontStoreQueue = await Order.find({ shopId : req.body.shopId })
    // the reason to set "f" in front of req.body.shopId is to avoid a same id with req.body.userId even if it rarely occur
    await app_api.redis.set("f" + req.body.shopId, JSON.stringify(frontStoreQueue), 'EX', expiration, () => { console.log("frontstore queue updated sucessfully!") });

    // update that customer queue
    let customerQueue = await Order.find({ userId : req.body.userId })
    await app_api.redis.set("c" + req.body.userId, JSON.stringify(customerQueue), 'EX', expiration, () => { console.log("customer queue updated sucessfully!") });

  } catch (e) {
    console.error("unable to store food order", e);
    res.status(400).json({
    success: false,
    message: e
  });
  }
});

// view order (from customer or frontstore view)
router.get('/:viewer', async (req, res, next) => {
  try {
    var viewerCode = req.params.viewer == "frontstore" ? "f" :
                     req.params.viewer == "customer" ? "c" :
                     "invaild"

    // If a given viewer in URL is incorrect, return error response
    if (viewerCode == "invaild") {
      res.status(200).json({
        message: "invaild viewer!",
        givenViewer: req.params.viewer
      });
      return;
    } 

    // find data from redis
    let getOrderFromRedis = await app_api.getAsync(viewerCode + req.body.id);

    if (!getOrderFromRedis) {
      // In case of there is no data in redis but still is in database
      let queue;
      if (viewerCode == "f") {
        queue = await Order.find({ shopId : req.body.id })
      } else {
        queue = await Order.find({ userId : req.body.id })
      }
      
      if (queue) {
        // data found
        res.status(200).json({
          source: "mongodb",
          message: "sucessfully query the queue!",
          data: queue
        });
        // update in redis given with a apporpriate viewer
        await app_api.redis.set(viewerCode + req.body.id, JSON.stringify(queue), 'EX', expiration, () => { console.log("queue updated sucessfully!") });

      } else {
        // data not found
        res.status(404).json({
          message: "no order yet (or maybe invaild given id)",
          data: {},
          givenId: req.body.id
        });
      }

    } else {
      // in case of data is found in redis
      res.status(200).json({
        source: "redis",
        message: "sucessfully query the queue!",
        data: JSON.parse(getOrderFromRedis)
      });
    }

  } catch (e) {
    console.error("unable to check order", e);
    res.status(400).json({
    success: false,
    message: e
  });
  }
})

module.exports = router;