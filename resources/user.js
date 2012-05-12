/**
* Standard User resource
*/
var Player = require( "../original_modules/player.js" ).Player;
var Story = require( "../original_modules/story.js" ).Story;

this.show = function(req, res) { 
	var params = req.params;
	var query = req.query;
	var usertab = query['usertab'] || false;
	// change the search criteria back to  { _id : params.user } 
	Player.findOne( { _id  : params.user }, function( err, user ) { 
		if ( user == undefined ) { 
			res.render( "error/player.jade", { title : "FFOshitVN", player : false } );
		} // end if
		else { 
			var session_user = req.session.user;
			switch (usertab) { 
				case 'novel' :
					Story.find( { owner : user._id }, function( err, stories ) { 
						if ( err ) { 
							console.log( err );
							res.render( "error/database.jade", { title : "FFOshitVN", player : false } );
						} // end if 
						else { 
							console.log( stories );
							res.render( "users/show.jade", { title : "FFOpenVN", player : user, usertab : usertab, stories : stories } );
						} // end else
					} ); // end Story.find
					return;
				default :
					res.render("users/show.jade", { title : "FFOpenVN" , player : user, usertab : usertab } );
					return;		
			} // end switch
		} // end else
	} ); // findOne
}; // end show

this.create = function(req, res) { 
	var params = req.body.user;
	
	var user = new Player( { 
		'email' : params['email'] ,
		'password' : params['password'] ,
		'name' : params['name'],
	} ); // end user
	var data = {};
	data['referer'] = params['referer'];
	data['header'] = req.headers;
	user.data = data;
	user.save(function(err){ 
		if ( err ) { 
			req.flash( "user create", err );
		} // end if
		else {
			req.flash( "user create", "Thanks for signing up. We're not quite ready for you yet, but we will let you know through email when we are." ); 
			req.session.user = user;
		} // end else
	} ); // end save
	res.redirect("back");
}; // end create

this.delete = function(req, res) { };
this.update = function(req, res) { };
this.index = function(req, res) { };
this.new = function(req, res) { };
this.edit = function(req, res) { };
