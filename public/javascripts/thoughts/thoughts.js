/**
* Socket.IO communication Package-ClientSide
*/
var socket = io.connect('http://localhost:3000');
socket.on( "connection", function(id){ 
	sessionId = id;
});

/**
* Admin
*/


var thoughts = function(){
	var adminFunctionHandlers = {};
	socket.on( "admin event down", function(packet){ 
		var name = packet['name'];
		var data = packet['data'];
		var handlers = adminFunctionHandlers[name];
		if(  handlers == undefined ) { 
			return;
		} // end if
		for( var k = 0; k < handlers.length; k++) { 
			handlers[k](data);
		} // end for
	} ); // end admin event down	
	return{ 
		AddAdmin : function( eventname, func ) { 
			if( adminFunctionHandlers[ eventname ] === undefined ) { 
				adminFunctionHandlers[ eventname ] = [];
			}
			adminFunctionHandlers[ eventname ].push( func );
		} , // end AddAdmin
		FireAdmin : function( eventname, data ) { 
			var packet = { 
				name : eventname ,
				data : data
			}; // end packet
			socket.emit("admin event up", packet);
		} // end FireAdmin
	}; // end return
}(); // end thoughts
