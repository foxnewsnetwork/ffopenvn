/**
* Model Declaration
*/
var storySchema = require("../original_modules/story.js");
var Story = storySchema.Story;

/**
* Controller section
*/
this.new = function(req, res){ 
	if ( req.session.user ) { 
		res.render("stories/new.jade", { title : "FFOpenVN", player : req.session.user } );
	} // end if
	else { 
		res.render("error/login.jade", { title : "FFOpenVN", player : false } );
	} // end else
}; // end new

this.destroy = function(req, res){ }; // end destroy

this.create = function(req, res){ 
	var user = req.session.user;
	console.log( user );
	if ( user == undefined ) { 
		console.log( "You have to exist before you can write visual novels" );
		res.redirect("back");
		return;
	} // end if
	var params = req.body.story;
	console.log("Create request received in Story: " );
	console.log( params );
	var story = new Story( {
		title : params.title,
		cover : params.cover ,
		category : params.parent == "0" ? params.parent : "Original" ,
		owner : user._id
	} ); // end Story
	story.save( function(err){
		if(err) { 
			// TODO: handle error
			console.log(err);
			res.redirect("back");
		} // end if
		else {	
			console.log("Save successful @ " + story._id);
			res.redirect("/story/" + story._id );
		} // end else
	} ); // end save
}; // end create

this.edit = function(req, res){ 
	var params = req.params;
	Story.findOne( { _id : params.story }, function(err,obj){ 
		res.render("stories/edit.jade", { title : "FFOpenVN", story : obj, player : req.session.user } );
	} ); // end findOne
}; // end edit

this.show = function(req, res){ 
	var params = req.params;
	var ip = req.connection.remoteAddress;
	var query = req.query;
	var usertab = query['usertab'] || false;
	Story.findOne( { _id : params.story }, function(err,obj){ 
		console.log( "Story Show called against " + params.story + " , found object: " );
		console.log( params );
		res.render("stories/show.jade", { title : "FFOpenVN", story : obj, player : req.session.user, usertab : usertab } );	
	} ); // end findOne
}; // end show

this.index = function(req, res){ 
	var category = req.params.cat;
	var ip = req.connection.remoteAddress;
	console.log( "in resource index " + ip );
	Story.find({}, function(err, obj){ 
		res.render( "stories/index.jade", { title : "FFOpenVN Index", stories : obj, player : req.session.user } );
	} ); // end find
}; // end index

this.update = function(req, res){ }; // end update
