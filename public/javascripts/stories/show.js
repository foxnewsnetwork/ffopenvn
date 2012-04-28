socket.on( "connection", function(id) { 
	$("#startnovel").click(function() { 
		var data = { sid : $("#storyid").val() };
		socket.emit( "story show connection" , data );		
	} ); // end startnovel
} ); // end connection

socket.on( "story show connection", function(scenes) { 
	var myvn = new FFOpenVN();
	var data = [];
	for ( var k = 0; k < scenes.length; k++ ) { 
		data.push( scenes[k]['data'] );
	} // end for
	myvn.Load(data);
	myvn.Click(function(){ myvn.Next(); } );
	
	myvn.End( function() { 
		myvn.Scene(0);
	} ); // end End
	myvn.Scene(0);
} ); // end story show connection
