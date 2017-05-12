var express = require('express');
var requestHandler = express.Router();

var exec = require('child_process').exec;

var container_list = ["first" ,"second", "third"];
var container_ips = ["10.1.125.26:8081" ,"10.1.125.240:8081", "10.1.125.133:8081"];
var loadindex = 0;

var headers = {
    	'User-Agent':       'Super Agent/0.0.1',
    	'Content-Type':     'application/json'
	}

var options = {
    	url: 'http://'+ container_ips[(loadindex++)%3] +':3000'+req.params.param+ '/' +req.params.param2+ '/' +req.params.param3 ,
    	method: 'GET',
    	headers: headers,
    	qs: req.params.param
	}

	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        res.send(body);
	        console.log(body);
	    }
});


requestHandler.get('/:param/:param2/:param3',function (req,res) {
	console.log("Hello");
	console.log(req.params.param);
	var headers = {
    	'User-Agent':       'Super Agent/0.0.1',
    	'Content-Type':     'application/json'
	}
	console.log(req.params.param);
	var options = {
    	url: 'http://'+ container_ips[(loadindex++)%3] +':3000'+req.params.param+ '/' +req.params.param2+ '/' +req.params.param3 ,
    	method: 'GET',
    	headers: headers,
    	qs: req.params.param
	}

	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        res.send(body);
	        console.log(body);
	    }
	});

});

requestHandler.post('/:param/:param2/:param3',function (req,res) {
	var headers = {
    	'User-Agent':       'Super Agent/0.0.1',
    	'Content-Type':     'application/x-www-form-urlencoded'
	}
	var options = {
    	url: 'http://'+ container_ips[(loadindex++)%3] +':3000'+req.params.param+ '/' +req.params.param2+ '/' +req.params.param3 ,
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

requestHandler.delete('/:param/:param2/:param3',function (req,res) {
	var headers = {
    	'User-Agent':       'Super Agent/0.0.1',
    	'Content-Type':     'application/json'

	}
	var options = {
    	url: 'http://'+ container_ips[(loadindex++)%3] +':3000'+req.params.param+ '/' +req.params.param2+ '/' +req.params.param3 ,
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
    	url: 'http://'+ container_ips[(loadindex++)%3] +':3000'+req.params.param+ '/' +req.params.param2+ '/' +req.params.param3 ,
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
