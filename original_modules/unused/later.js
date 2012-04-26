/**
* Socket.io-based Communication
*/
// Socket.IO
var io = require("socket.io").listen(3000);

// Custom A/B Test Manager
var ABTest = require( "./abtest.js" );
var ABTestManager = ABTest.ABTestManager;

// Function handlers
var getFunctionHandlers = {};
var postFunctionHandlers = {};
var updateFunctionHandlers = {};
var deleteFunctionHandlers = {};

// Managing the handlers
this.AddGet = function(target, func){ 
	var handlers = getFunctionHandlers[target];
	if( handlers == undefined ){ 
		handlers = [];
	} // end if
	handlers.push(func);
}; // end get
this.AddPost = function(target, func){ 
	var handlers = postFunctionHandlers[target];
	if( handlers == undefined ){ 
		handlers = [];
	} // end if
	handlers.push(func);
}; // end post
this.AddUpdate = function(target, func){ 
	var handlers = updateFunctionHandlers[target];
	if( handlers == undefined ){ 
		handlers = [];
	} // end if
	handlers.push(func);
}; // end update
this.AddDelete = function(target, func){ 
	var handlers = deleteFunctionHandlers[target];
	if( handlers == undefined ){ 
		handlers = [];
	} // end if
	handlers.push(func);
}; // end delete

// You need to call listen if you want to
this.listen = function(){ 
	io.sockets.on( "connection", function(socket) { 
		socket.emit( 'connection', socket.id );
		socket.on( "disconnect", function() { 
			// TODO : write me
		} ); // end on disconnect
		
		/**
		* Admin-Database-FileSystem-Section
		*/
		socket.on( "admin event up", function(rawdata) { 
			var name = rawdata['name'];
			var rawdata = rawdata['data'];
			var output;
			if( name == "analytics up" ){ 
				var analytics = rawdata; 
				var ip = socket.handshake.address['address'];
				analytics['ip'] = ip;
				ABTestManager.SendAnalytics( analytics );
				output = { 
					name : "analytics down" ,
					data : true	
				}; //end output
			} // end if
			if ( name == "data up" ) { 
				var data = rawdata;
				var ip = socket.handshake.address['address'];
				data['ip'] = ip;
				ABTestManager.SendData( data );
				output = { 
					name : "data down" ,
					data : true	
				}; //end output
			} // end if
			socket.emit( "admin event down", output );
		} ); // end admin event up
		
		/**
		* Chat Channel Section
		*/
		
		/**
		* Game Room Section
		*/
		
		/**
		* Shop Section
		*/
		
		/**
		* HTTP Section
		*/
		socket.on("get up", function(data){ 
			var target = data['url'];
			var param = data['param'];
			var handlers = getFunctionHandlers[target];
			console.log( "GET URL visited: " + target );
			if( handlers == undefined ){ 
				return;
			} 	 // end if
			for( var k = 0; k < handlers.length; k++ ) { 
				handlers[k](param);
			} // end for
		} ); // end on get up
		socket.on("post up", function(data){ 
			var target = data['url'];
			var param = data['param'];
			var handlers = postFunctionHandlers[target];
			console.log( "POST URL visited: " + target );
			if( handlers == undefined ){ 
				return;
			} 	 // end if
			for( var k = 0; k < handlers.length; k++ ) { 
				handlers[k](param);
			} // end for
		} ); // end on post up
		socket.on("update up", function(data){ 
			var target = data['url'];
			var param = data['param'];
			var handlers = updateFunctionHandlers[target];
			console.log( "UPDATE URL visited: " + target );
			if( handlers == undefined ){ 
				return;
			} 	 // end if
			for( var k = 0; k < handlers.length; k++ ) { 
				handlers[k](param);
			} // end for
		} ); // end on update up
		socket.on("delete up", function(data){ 
			var target = data['url'];
			var param = data['param'];
			var handlers = deleteFunctionHandlers[target];
			console.log( "DELETE URL visited: " + target );
			if( handlers == undefined ){ 
				return;
			} 	 // end if
			for( var k = 0; k < handlers.length; k++ ) { 
				handlers[k](param);
			} // end for
		} ); // end on delete up
	} ); // end on connection
	return this;
}; // end listen

