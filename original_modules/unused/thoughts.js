/**
* Socket.io-based Communication
*/

// Custom A/B Test Manager
var ABTest = require( "./abtest.js" );
var ABTestManager = ABTest.ABTestManager;

// Warning! This method is not scalable and we should go to using mongo or redis (lol)
var iptable = {};
/**
* Code Section
*/

this.listen = function(app){ 
	var io = require("socket.io").listen(app);
	
	io.sockets.on( "connection", function(socket) { 
		console.log('connection to server confirmed');
		socket.emit( 'connection', socket.id );
		var ip = socket.handshake.address['address'];
		iptable[ip] = socket;
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
	return{  // this architecture causes race conditions between socket connection and fireevent
		'FireEvent' : 	function(target, eventdata) {
			if( target == undefined || iptable[target] == undefined ){ 
				console.log( "Unknown ip address managed to connect to us without using socket.io. Faggot probably has javascript disabled" );
				return false;
			} // end if
			else { 
				var socket = iptable[target];
				console.log("MASSIVE NIGGER FAG " + socket.id);
				var name = eventdata['name'];
				var data = eventdata['data'];
				socket.emit( "ujs event down", { name : name , data : data } );
				return true;
			} // end else
		}, // end FireEvent
	}; // end return
}; // end initialize


