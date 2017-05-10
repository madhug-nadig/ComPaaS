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

    var container_ips = { OneUser: ["10.1.125.26" ,"10.1.125.240", "10.1.125.133"], TwoUser : ["10.1.125.45" , "10.1.125.6", "10.1.125.27"] };
    var container_list = { OneUser: ["first" ,"second", "third"], TwoUser : ["fourth", "fifth", "sixth"] };

    //var container_ips = ["10.1.125.26" ,"10.1.125.240", "10.1.125.133"];
    const exec = require('child_process').exec;
    

    if(load_index[userid] > 2){
    	console.log("Server overloaded, cannot create more containers");
    	res.send("Sorry, server overloaded. Cannot create more containers. TRY LATER.");
    	res.end();
    }

    else if(load_index[userid] == 0){
      const restarter = exec('sh restartplx.sh',
          (error, stdout, stderr) => {
              var standrd = `${stdout}`;
              console.log("Restarting containers.");
              if(`${stderr}`){
                  console.log(`${stderr}`);
              }
              else{
                  console.log("The server will now run on :" + container_list[userid][(load_index[userid])%3] + "\n With IP:" + container_ips[userid][(load_index[userid])%3]);
                  const child = exec('lxc exec '+ container_list[userid][(load_index[userid]++)%3] + ' -- node n1.js &',
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
              }
              var for_sending = `${stdout}`;
              if (error !== null) {
                  console.log(`${error}`);
              }
          });
    	}

    else{
        console.log("The server will now run on :" + container_list[userid][(load_index[userid])%3] + "\n With IP:" + container_ips[userid][(load_index[userid])%3]);
        const child = exec('lxc exec '+ container_list[userid][(load_index[userid]++)%3] + ' -- node n1.js &',
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
    	}
  }
});

module.exports = router;
