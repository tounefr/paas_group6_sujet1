var express = require('express');
var router = express.Router();
var redis = require('redis');
var db = require('./index');
var redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
/* GET users listing. */
router.get('/', function(req, res, next) {
  db.dbName(function(name){
    res.send({
      status: redisClient.connected ? "OK" : "NOK",
      "dbName": name,
      redisConnectedClients: redisClient.server_info.connected_clients
    });
 });
});

module.exports = router;
