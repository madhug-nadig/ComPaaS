var express = require('express');
var app = express();
var exec = require('child_process').exec;
app.use(express.static(__dirname));
var container_list = ["first" ,"second", "third"];
var container_ips = ["10.1.125.26:8081" ,"10.1.125.240:8081", "10.1.125.133:8081"];
var loadindex=0;
app.get('/',function (req,res) {
	var output="Hello World";
	exec("curl "+container_ips[(loadindex++)%3],
                    (error, stdout, stderr) => {
                        console.log(`${stdout}`);
						res.send(`${stdout}`)
						output = `${stdout}`;                      
                    });

	//res.send(output)
})
app.listen(3000);
