/*

LXC Commands:

1) lxc launch upgraded <containername>
2) lxc list | grep <containername< | awk '{print $6 }'
3) lxc exec <containername> — git clone <url of git>
4) lxc exec <containername> — comand'

*/

var express = require('express');
var router = express.Router();
var load_index = {OneUser: 0, TwoUser:0};

var session_var;

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

    var container_ips = { OneUser: [], TwoUser : [] };
    var container_list = { OneUser: ["OneUser-Container1" ,"OneUser-Container2", "OneUser-Container3"], TwoUser : ["TwoUser-Container1", "TwoUser-Container2", "TwoUser-Container3"] };

    //var container_ips = ["10.1.125.26" ,"10.1.125.240", "10.1.125.133"];
    const exec = require('child_process').exec;
    

    if(load_index[obj.user] > 2){
    	console.log("Server overloaded, cannot create more containers");
    	res.send("Sorry, server overloaded. Cannot create more containers. TRY LATER.");
    	res.end();
    }

    else if(load_index[obj.user] == 0){
      const restarter = exec('sh restartplx.sh',
          (error, stdout, stderr) => {
              var standrd = `${stdout}`;
              console.log("Restarting containers.");
              if(`${stderr}`){
                  console.log(`${stderr}`);
              }
              else{
                  console.log("The server will now run on :" + container_list[obj.user][(load_index[obj.user])%3]);
                  const child = exec('lxc launch upgraded '+ container_list[obj.user][(load_index[obj.user]++)%3] + ' &',
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
                      });
                  const get_ip = exec("lxc list | grep <"+ container_list[obj.user][(load_index[obj.user])%3] + "< | awk '{print $6 }'",
                      (error, stdout, stderr) => {
                          var ip = `${stdout}`;
                          console.log("Container IP: " + `${stdout}`);
                          if(`${stderr}`){
                              console.log(`${stderr}`);
                          }
                          container_ips[obj.user].push(ip);
                          if (error !== null) {
                              console.log(`${error}`);
                          }
                      });
              }
              var for_sending = `${stdout}`;
              if (error !== null) {
                  console.log(`${error}`);
              }
          });
    	}

    else{
        console.log("The server will now run on :" + container_list[obj.user][(load_index[obj.user])%3]);
        const child = exec('lxc launch upgraded '+ container_list[obj.user][(load_index[obj.user]++)%3] + ' `&',
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
            });
          const get_ip = exec("lxc list | grep <"+ container_list[obj.user][(load_index[obj.user])%3] + "< | awk '{print $6 }'",
            (error, stdout, stderr) => {
                var ip = `${stdout}`;
                console.log("Container IP: " + `${stdout}`);
                if(`${stderr}`){
                    console.log(`${stderr}`);
                }
                container_ips[obj.user].push(ip);
                if (error !== null) {
                    console.log(`${error}`);
                }
            });
    	}
  }
});

module.exports = router;
