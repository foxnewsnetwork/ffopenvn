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
		
		socket.on( "story show connection", function(data) { 
			var sid = data['sid'];
			Story.findOne( { _id : sid }, function(err, story) { 
				if( story == undefined ) {
					return;
				} //end if
				Chapter.findOne( { _id : story.first() }, function(err, chapter) { 
					if( chapter == undefined ) {
						return;
					} // end if
					Scene.find( { chapter_id : chapter._id }, function(err, scenes) { 
						if( scenes == undefined || scenes.length == 0 ) { 
							console.log( "Scenes not found" );
							return;
						} // end if
						socket.emit( "story show connection", scenes );
					} ); // end scene find
				} ); // end chapter findone
			} ); // end findOne
		} ); // end story show connection
		
		socket.on( "chapter edit connection", function(data) { 
			var sid = data['sid'];
			Story.findOne( {_id : sid }, function(err, story) { 
				if ( story == undefined ) { 
					return;
				} // end if
				Chapter.findOne( { _id : story.first() }, function( err, chapter ) { 
					Scene.find( { chapter_id : chapter._id }, function( err, scenes ) { 
						if ( scenes == undefined || scenes.length == 0 ) { 
							console.log( "Scenes not found" );
							return;
						} // end if
						socket.emit( "chapter edit connection", scenes );
					} ); // end Scene.find
				} ); // end Chapter.findOne
			} ); // end Story.findOne
		} ); // end chapter edit connection
		
		socket.on( "chapter edit save", function(scenedata) { 
			var sceneid = scenedata['sceneid'];
			Scene.findOne( { _id : sceneid}, function(err,scene) { 
				scene.data = scenedata['data'];
				scene.save(function(err) { 
					if ( err ) { 
						console.log(err);
					} // end if
					else { 
						console.log( "successful save is successful" );
					} // end else
				} ); // end save
			} ); // end Scene.findOne
		} ); // end chapter edit save
	} ); // end on connection
	return this;
}; // end listen
