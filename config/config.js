var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');

module.exports = function (){
	var app = express();

	app.use(bodyParser.urlencoded( {extend:true}));
	app.use(bodyParser.json());
	app.use(multiparty());

	app.use(function(req, res, next){
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		res.setHeader("Access-Control-Allow-Headers", "content-type");
		res.setHeader("Access-Control-Allow-Credentials", true);

		next();
	});

	load('infra')
	    .into(app);

	return app;
}





