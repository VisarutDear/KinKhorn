const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { promisify } = require("util");

const app = express();

// mongodb
mongoose.connect('mongodb://kinkhorn:TcdVQ7XhxnS3Mp32uGSU@mongodb:27017/kinkhorn', 
                { useNewUrlParser: true, useUnifiedTopology: true });

// redis
const redisClient = require("redis").createClient;
const redis = redisClient({
  host: 'redis',
  port: 6379,
  password: 'QCY68NMK7KGNabfPg72P'
});

// check redis connection error
redis.on('error', err => {
  console.log('Error ' + err);
});

const getAsync = promisify(redis.get).bind(redis);

// routes
const shopsRoutes = require('./routes/shops');
const ordersRoutes = require('./routes/orders');

// connect to mongodb
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', function () { 
  console.log('connected sucessfully!!');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/shops", shopsRoutes);
app.use("/api/orders", ordersRoutes);

module.exports.app = app;
module.exports.redis = redis;
module.exports.getAsync = getAsync;