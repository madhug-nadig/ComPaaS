/*

LXC Commands:

1) lxc launch upgraded <containername>
2) lxc list | grep <containername< | awk '{print $6 }'
3) lxc exec <containername> — git clone <url of git>
4) lxc exec <containername> — comand'

*/

var express = require('express');
var sleep = require('sleep');
var router = express.Router();
var load_index = {OneUser: 0, TwoUser:0};
var session_var;
var container_ips = { OneUser: [], TwoUser : [] };
var container_list = { OneUser: [], TwoUser : [] };
var url_ips = { OneUser: [], TwoUser : [] };
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.render('index', { title: 'PaaS' });
  }
  else{
    res.redirect('/login')
  }
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET login page. */
router.post('/login', function(req, res, next) {
  if(!req.session.user){
    if((req.body.user == "OneUser" && req.body.pwd == "pass") ||(req.body.user == "TwoUser" && req.body.pwd == "pass")){
      session_var = req.session;
      session_var.user = req.body.user;
      res.redirect('/');
    }
  }
  else{
    res.redirect('/');
  }
});


function createInstance(instanceName,image) {
    var ipReturn = "";
    const exec = require('child_process').exec;
    const child = exec('lxc launch '+image+' '+ instanceName,
    (error, stdout, stderr) => {
        var standrd = `${stdout}`;
        console.log(`${stdout}`);
        if(`${stderr}`){
            console.log(`${stderr}`);
        }
        var for_sending = `${stdout}`;
        if (error !== null) {
            console.log(`${error}`);
        }
        else{ 
          console.log(instanceName+" Successfully created");
          sleep.sleep(4);
          const get_ip = exec("lxc list | grep "+ instanceName + " | awk '{print $6 }'",
              (error, out, stderr) => {
                  var ip = `${out}`;
                  ipReturn = ip.trim();
                  console.log("Container "+instanceName+" IP: " + ip);
                  if(`${stderr}`){
                      console.log(`${stderr}`);
                  }
                  if (error !== null) {
                      console.log(`${error}`);
                  }
              });
             
        }
      });
    return ipReturn;
}
/* Create an instance. */
router.post('/create_instance', function(req, res, next) {
    if(req.session.user){  
        console.log(req.body.data);

        var obj = JSON.parse(req.body.data);
        console.log("Userid: "  + obj.user);

        if(obj.user != "OneUser" && obj.user != "TwoUser"){
          console.log("Invalid user");
          res.send("Invalid username. Forbidden");
          res.status(403);
          res.end()
        }

        if(load_index[obj.user] > 2){
        	console.log("Server overloaded, cannot create more containers");
        	res.send("Sorry, server overloaded. Cannot create more containers. TRY LATER.");
        	res.end();
        }

        //const exec = require('child_process').exec;

        //create a load Balancer for the user
        if(load_index[obj.user] == 0) {
            console.log("Creating Load balancer for : "+obj.user);
            //var userIp = createInstance(obj.user,'load');
            url_ips[obj.user].push(createInstance(obj.user,'load'));
            console.log(url_ips);
            container_list[obj.user].push("" + obj.user + "-Container" + (load_index[obj.user]));
            console.log("Adding container : "+container_list[obj.user][container_list[obj.user].length-1]);
            load_index[obj.user]++;
            userIp = createInstance(obj.user,'load');
            container_ips[obj.user].push(userIp);
            console.log(container_ips);
        }
        else {
            container_list[obj.user].push("" + obj.user + "-Container" + (load_index[obj.user]));
            console.log("Adding container : "+container_list[obj.user][container_list[obj.user].length-1]);
            load_index[obj.user]++;
            var userIp = createInstance(container_list[obj.user][container_list[obj.user].length-1],'upgraded');
            container_ips[obj.user].push(userIp);
            console.log(container_ips);
        }
    }
});

module.exports = router;
