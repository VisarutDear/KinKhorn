const express = require('express');
const router = express.Router();
const Shop = require('../models/shop');

// get /shop page
router.get('/customer', (req, res, next) => {
    
    Shop.find()
        .then(documents => {
            res.status(200).json({
            message: "Message sent successfully!",
            shops: documents
            });
        });
})

router.post('/frontstore/:id', (req, res, next) => {

    const shop = new Shop({
        shop: req.body.shop,
        owner: req.params.id,
        area: req.body.area,
        menu: req.body.menu
    });
    shop.save()
        .then(createdShop => {
            res.status(201).json({
            shopId: createdShop._id,
            message: 'shop added sucessfully!'
            })
        });
});

router.delete("/frontstore/:id", (req, res, next) => {

    Shop.deleteOne({_id: req.params.id})
      .then(result => {
        console.log(result);
        res.status(200).json({ message: "shop deleted sucessfully!" });
      });
  })

module.exports = router;