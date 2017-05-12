var express = require('express');
var app = express();
var requests = require('requests');

var exec = require('child_process').exec;
app.use(express.static(__dirname));
var container_list = ["first" ,"second", "third"];
var container_ips = ["10.1.125.26:8081" ,"10.1.125.240:8081", "10.1.125.133:8081"];
var loadindex = 0;

app.get('/:param',function (req,res) {
	var headers = {
    	'User-Agent':       'Super Agent/0.0.1',
    	'Content-Type':     'application/json'
	}
	var options = {
    	url: 'http://'+ container_ips[(loadindex++)%3] +':3000'+req.params.param,
    	method: 'GET',
    	headers: headers,
    	qs: req.params.param
	}
});

app.post('/:param',function (req,res) {
	var headers = {
    	'User-Agent':       'Super Agent/0.0.1',
    	'Content-Type':     'application/x-www-form-urlencoded'
	}
	var options = {
    	url: 'http://'+ container_ips[(loadindex++)%3] +':3000'+req.params.param,
    	method: 'POST',
    	headers: headers,
    	form: req.data
	}

	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        res.send()
	        console.log(body);
	    }
	})

});

app.delete('/:param',function (req,res) {
	var headers = {
    	'User-Agent':       'Super Agent/0.0.1'
	}
	var options = {
    	url: 'http://'+ container_ips[(loadindex++)%3] +':3000'+req.params.param,
    	method: 'DELETE',
    	headers: headers
	}
});

app.put('/:param',function (req,res) {
	var headers = {
    	'User-Agent':       'Super Agent/0.0.1'
	}
	var options = {
    	url: 'http://samwize.com',
    	method: 'PUT',
    	headers: headers,
    	form: {'key1': 'xxx', 'key2': 'yyy'}
	}
});

app.listen(3000);
