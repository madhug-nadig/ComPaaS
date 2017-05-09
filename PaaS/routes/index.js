var express = require('express');
var router = express.Router();
var load_index = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Create an instance. */
router.post('/create_instance', function(req, res, next) {
  console.log(req.body.data);
  var obj = JSON.parse(req.body.data);
  console.log("Userid: "  + obj.user);

  var container_list = ["first" ,"second", "third"];
  var container_ips = ["10.1.125.26" ,"10.1.125.240", "10.1.125.133"];
  const exec = require('child_process').exec;
  

  if(load_index > 2){
  	console.log("Server overloaded, cannot create more containers");
  	res.send("Sorry, server overloaded. Cannot create more containers. TRY LATER.");
  	res.end();
  }

  else if(load_index == 0){
    const restarter = exec('sh restartplx.sh',
        (error, stdout, stderr) => {
            var standrd = `${stdout}`;
            console.log("Restarting containers.");
            if(`${stderr}`){
                console.log(`${stderr}`);
            }
            else{
                console.log("The server will now run on :" + container_list[(load_index)%3] + "\n With IP:" + container_ips[(load_index)%3]);
                const child = exec('lxc exec '+ container_list[(load_index++)%3] + ' -- node n1.js &',
                    (error, stdout, stderr) => {
                        var standrd = `${stdout}`;
                        console.log(`${stdout}`);
                        if(`${stderr}`){
                            console.log(`${stderr}`);
                        }
                        var for_sending = `${stdout}`;
                        //res.redirect(container_ips[load_index%3]+':8081');
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
      console.log("The server will now run on :" + container_list[(load_index)%3] + "\n With IP:" + container_ips[(load_index)%3]);
      const child = exec('lxc exec '+ container_list[(load_index++)%3] + ' -- node n1.js &',
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

});

module.exports = router;
