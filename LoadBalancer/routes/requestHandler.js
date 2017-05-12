var express = require('express');
var requestHandler = express.Router();
var request = require('request');
var exec = require('child_process').exec;

var container_ips = ['10.1.125.191'];
var loadindex = 0;

requestHandler.get('/master/:param',function (req,res) {
	var ip = req.params.param;
	container_ips.push(ip);
	res.json({"status":"successful"});
});

requestHandler.get('/*',function (req,res) {
	console.log("Hello");
	var headers = {
    	'User-Agent':       'Super Agent/0.0.1',
    	'Content-Type':     'application/json'
	}
	var options = {
    	url: 'http://'+ container_ips[(loadindex++)%container_ips.length] +':8081/'+req.params[0] ,
    	method: 'GET',
    	headers: headers,
    	qs: req.params
	}
	console.log(options.url);
	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        res.send(body);
	        console.log(body);
	    }
	});

});

requestHandler.post('/*',function (req,res) {
	var headers = {
    	'User-Agent':       'Super Agent/0.0.1',
    	'Content-Type':     'application/x-www-form-urlencoded'
	}
	var options = {
    	url: 'http://'+ container_ips[(loadindex++)%container_ips.length] +':8081'+req.params[0] ,
    	method: 'POST',
    	headers: headers,
    	json: req.body.data
	}

	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        res.send(body);
	        console.log(body);
	    }
	});

});

requestHandler.delete('/*',function (req,res) {
	var headers = {
    	'User-Agent':       'Super Agent/0.0.1',
    	'Content-Type':     'application/json'

	}
	var options = {
    	url: 'http://'+ container_ips[(loadindex++)%container_ips.length] +':8081/'+req.params[0] ,
    	method: 'DELETE',
    	headers: headers
	}

	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        res.send(body)
	        console.log(body);
	    }
	});
});

requestHandler.put('/:param/:param2/:param3',function (req,res) {
	var headers = {
    	'User-Agent':       'Super Agent/0.0.1',
    	'Content-Type':     'application/json'
	}
	var options = {
    	url: 'http://'+ container_ips[(loadindex++)%container_ips.length] +':8081/'+req.params[0] ,
    	method: 'PUT',
    	headers: headers,
    	json: req.body.data
	}

	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        res.send(body);
	        console.log(body);
	    }
	});
});

module.exports = requestHandler;
