function PutForm( url, name, callback ) { 
	var inputs = $(name + " :input");
	var data = {};
	inputs.each( function() { 
		data[this.name] = $(this).val();
	} ); // end each
	$.ajax({ 
		url : url ,
		type : "PUT",
		data : data ,
		success : callback 
	} ); // end ajax
} // end PutForm
