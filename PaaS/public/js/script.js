userid = "";


function createInstance(){
 	userid = $("#us").val();

 console.log(userid);
 postdata = {user: userid};
 url = "/create_instance";
	$.post(url, {data : JSON.stringify(postdata)},function(data, status){
		console.log(result);
	});
}