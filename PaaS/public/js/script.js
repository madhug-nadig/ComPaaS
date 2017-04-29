function createInstance(){
 
 $.ajax({url: "/create_instance", success: function(result){
		console.log(result);
	}});
}