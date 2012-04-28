/**
* Model Declaration
*/
var storySchema = require("../original_modules/story.js");
var Story = storySchema.Story;
var chapterSchema = require("../original_modules/story.js");
var Chapter = chapterSchema.Chapter;

this.new = function(req, res){ 
	res.render("chapters/new.jade", { player : req.session.user });
}; // end new
this.destroy = function(req, res){ }; // end destroy
this.create = function(req, res){ }; // end create
this.edit = function(req, res){ 
	
}; // end edit
this.show = function(req, res){ 
	
}; // end show
this.index = function(req, res){ 
	var params = req.query;
	var sid = params.sid;
	if( sid == undefined ) { 
		res.send( "You don't look like you're going to join the Barracuda league, what the hell are you doing here?" );
		return;
	} // end if
	res.render("chapters/index.jade", { title : "FFOpenVN", sid : sid, player : req.session.user } );
}; // end index
this.update = function(req, res){ }; // end update
