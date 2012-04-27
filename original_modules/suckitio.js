/**
* RESTful Socket.IO
*/


/**
* Modules
*/
var Story = require("./story.js").Story;
var Chapter = require("./chapter.js").Chapter;
var Scene = require("./scene.js").Scene;

/**
* Socket.io UJS (RESTful)
*/
this.listen = function(app) { 
	var io = require("socket.io").listen(app);
	io.sockets.on( "connection", function(socket){ 
		socket.emit("connection", socket.id);
		socket.on("chapter index connection", function(data) { 
			var sid = data['sid'];
			Story.findOne( { _id : sid }, function(err, obj) { 
				socket.emit( "chapter index connection", obj );
			} ); // end findOne
		} ); // end socket.on
	} ); // end on connection
	return this;
}; // end listen
