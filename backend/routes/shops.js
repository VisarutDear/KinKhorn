const express = require('express');
const { promisify } = require("util");
const Shop = require('../models/shop');
const app_api = require('../app');

const router = express.Router();
const title = "shopList"

// get shop list (customer side)
router.get('/customer', async (req, res, next) => {
    try {
        // find data from redis
        let getTitleDataFromCache = await app_api.getAsync(title);

        if (!getTitleDataFromCache) {
            
            let result = await Shop.find();
            // send result from mongodb
            res.status(200).json({
                message: "message sent successfully!",
                source: "mongodb",
                data: result
            });
            // add shopList to redis
            await app_api.redis.set(title, JSON.stringify(result));
        }

        // send result from redis
        res.status(200).json({
        message: "message sent successfully!",
        source: "redis",
        data: JSON.parse(getTitleDataFromCache)
        });

    } catch (e) {
        console.error("unable to get list of shops", e);
        res.status(400).json({
        success: false,
        message: e
    });
    }
})

// create shop (frontstore side)
router.post('/frontstore/:ownerId', async (req, res, next) => {
    try {
        const shop = new Shop({
            shop: req.body.shop,
            owner: req.params.ownerId,
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

        // update shopList to redis
        let result = await Shop.find()
        await app_api.redis.set(title, JSON.stringify(result));

    } catch (e) {
        console.error("unable to record shop", e);
        res.status(400).json({
        success: false,
        message: e
    });
    }
});

// remove shop (frontstore side)
router.delete("/frontstore/:shopId", async (req, res, next) => {
    try {
        //delete shop in mongodb
        Shop.deleteOne({_id: req.params.shopId})
            .then(result => {
            console.log(result);
            res.status(200).json({ message: "shop deleted sucessfully!" });
        });

        // update shopList to redis
        let updatedResult = await Shop.find()
        await app_api.redis.set(title, JSON.stringify(updatedResult));

    } catch (e) {
        console.error("unable to delete shop", e);
        res.status(400).json({
        success: false,
        message: e
    });
    }
})

module.exports = router;