/**
* Standard User resource
*/
var Player = require( "../original_modules/player.js" ).Player;

this.show = function(req, res) { 
	var params = req.params;
	var usertab = params['usertab'] || false;
	
	Player.findOne( { _id : params.user }, function( err, user ) { 
		if ( user == undefined ) { 
			res.render( "error/player.jade", { title : "FFOshitVN", player : false } );
		} // end if
		else { 
			var session_user = req.session.user;
			var flag = session_user._id == user._id;
			res.render("users/show.jade", { title : "FFOpenVN" , player : user, usertab : usertab, flag : flag } );
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
