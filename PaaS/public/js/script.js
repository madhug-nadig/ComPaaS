userid = "";


function createInstance(){
 	userid = $("#us").val();

 console.log(userid);
 postdata = {user: userid};
 url = "/create_instance";
	$.post(url, {data : JSON.stringify(postdata)},function(data, status){
		console.log(data);
	});
}

function deployInstance(){
 	 repo = $("#repo").val();
 	 execpath = $("#path").val();


	 console.log(userid);
	 postdata = {user: userid, url: repo, path:execpath};
	 url = "/deploy_instance";
		$.post(url, {data : JSON.stringify(postdata)},function(data, status){
			console.log(data);
		});
}