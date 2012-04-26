/**
* Socket.IO communication Package-ClientSide
*/
var socket = io.connect('http://localhost:3000');

/**
* Admin
*/
var later = function(){
	var adminFunctionHandlers = {};
	var ujsFunctionHandlers = {};
	var httpFunctionHandlers = {};
	socket.on( "connection", function(id) { 
		var url = document.URL;
		socket.emit("get up", { url : url } )
	} ); // end on connection
	socket.on( "ujs event down" , function(packet){
		var name = packet['name'];
		var data = packet['data'];
		alert( JSON.stringify(packet) );
		var handlers = ujsFunctionHandlers[name];
		if(  handlers == undefined ) { 
			return;
		} // end if
		for( var k = 0; k < handlers.length; k++) { 
			handlers[k](data);
		} // end for
	} ); // end http event down
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
		} , // end FireAdmin
		AddUJS : function( eventname, func ) { 
			if (ujsFunctionHandlers[ eventname ] == undefined ) { 
				ujsFunctionHandlers[eventname] = [];
			} // end if
			ujsFunctionHandlers[eventname].push( func );
		}, // end AddUJS
		FireUJS : function( eventname, data ) { 
			var packet = { 
				name : eventname ,
				data : data
			}; // end packet
			socket.emit( "ujs event up", packet );
		} // end FireUJS
	}; // end return
}(); // end thoughts
