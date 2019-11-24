var express = require('express');
var router = express.Router();
var Client = require('pg').Client;
var client = new Client({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});
client.connect();
router.get('/', function(req, res, next) {
	client.query('SELECT content FROM message', (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({message: "Error while selecting in db"})
		} else {
			res.status(200).json({message: data.rows[0]})
		}

	});
});
var dbName = function(callback) {
	 return client.query("SELECT current_database() as name", function(err, res){
		if (err) {
			callback("unknown");
			return;
		}
		callback(res.rows[0].name);
	});
};
module.exports = { dbName, router};
