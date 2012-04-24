/**
* Socket.io-based Communication
*/

// Custom A/B Test Manager
var ABTest = require( "./abtest.js" );
var ABTestManager = ABTest.ABTestManager;
// Socket.io


/**
* Code Section
*/
this.initialize = function(app){ 
	var io = require('socket.io').listen(app);
	
	io.sockets.on( "connection", function(socket) { 
		console.log('connection to server confirmed');
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
	} ); // end on connection
}; // end initialize
