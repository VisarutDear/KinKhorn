const express = require('express');
const Shop = require('../models/shop');
const app_api = require('../app');

const router = express.Router();
const title = "shopList";
//const expiration = 3600; // second units

// get shop list (customer side)
router.get('/customer', async (req, res, next) => {
    try {
        // find data from redis
        const getTitleDataFromCache = await app_api.getAsync(title);

        if (!getTitleDataFromCache) {
            
            const result = await Shop.find();
            // send result from mongodb
            res.status(200).json({
                message: "message sent successfully!",
                source: "mongodb",
                data: result
            });
            // add shopList to redis
            await app_api.redis.set(title, JSON.stringify(result));

            return;
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
router.post('/frontstore', async (req, res, next) => {
    try {
        const shop = new Shop({
            shop: req.body.shop,
            ownerId: req.body.ownerId,
            area: req.body.area,
            menu: req.body.menu
        });

        const createdShop = await shop.save()
        res.status(201).json({
            shopId: createdShop._id,
            shopInfo: createdShop,
            message: 'shop added sucessfully!'
        })

        // update shopList to redis
        const updatedResult = await Shop.find()
        await app_api.redis.set(title, JSON.stringify(updatedResult));

    } catch (e) {
        console.error("unable to record shop", e);
        res.status(400).json({
        success: false,
        message: e
    });
    }
});

// update frontstore
router.put("/frontstore", async (req, res, next) => {

    try {
        const shop = new Shop({
            _id: req.body.shopId,
            shop: req.body.shop,
            ownerId: req.body.ownerId,
            area: req.body.area,
            menu: req.body.menu
        });

        Shop.updateOne({ _id: req.body.shopId }, shop)
            .then(result => {
                    res.status(200).json({ message: "shop updated sucessfully!",
                                        result: result }); 
                }, notfound => {
                    res.status(400).json({ message: "unable to update shop (wrong Id)",
                                           result: notfound });
                });

        // update shopList to redis
        console.log("Update Redis!")
        const updatedResult = await Shop.find();
        await app_api.redis.set(title, JSON.stringify(updatedResult));
        
    } catch (e) {
        console.error("unable to record shop", e);
        res.status(400).json({
        success: false,
        message: e
    });
    }

})

// remove shop (frontstore side)
router.delete("/frontstore/:shopId", async (req, res, next) => {
    try {
        //delete shop in mongodb
        Shop.deleteOne({ _id: req.params.shopId })
            .then(result => {
                    if (result.n == 1) {
                        res.status(200).json({ message: "shop deleted sucessfully!",
                                               result: result }); 
                    } else {
                        res.status(404).json({ message: "shop already deleted!",
                                               result: result }); 
                    }
                }, notfound => {
                    res.status(400).json({ message: "unable to delete shop (wrong Id)",
                                           result: notfound });
                });
        // update shopList to redis
        const updatedResult = await Shop.find();
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