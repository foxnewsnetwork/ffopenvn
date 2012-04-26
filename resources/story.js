/**
* Model Declaration
*/
var storySchema = require("../original_modules/story.js");
var Story = storySchema.Story;

/**
* Controller section
*/
this.new = function(req, res){ 
	res.render("stories/new.jade", { title : "FFOpenVN"} );
}; // end new

this.destroy = function(req, res){ }; // end destroy

this.create = function(req, res){ 
	var params = req.body.story;
	console.log("Create request received in Story: " );
	console.log( params );
	var story = new Story( {
		name : params.title,
		cover : params.cover ,
		category : params.parent == "0" ? params.parent : "Original"
	} ); // end Story
	story.save( function(err){
		if(err) { 
			// TODO: handle error
			console.log(err);
			res.redirect("back");
		} // end if
		else {	
			console.log("Save successful @ " + story._id);
			res.redirect("/stories/" + story._id );
		} // end else
	} ); // end save
}; // end create

this.edit = function(req, res){ 
	res.render("stories/edit.jade");
}; // end edit

this.show = function(req, res){ 
	var params = req.params;
	var ip = req.connection.remoteAddress;
	Story.findOne( { _id : params.stories }, function(err,obj){ 
		res.render("stories/show.jade", { title : "FFOpenVN", story : obj } );	
	} ); // end findOne
}; // end show

this.index = function(req, res){ 
	var category = req.params.cat;
	var ip = req.connection.remoteAddress;
	console.log( "in resource index " + ip );
	Story.find({}, function(err, obj){ 
		res.render( "stories/index.jade", { title : "FFOpenVN Index", stories : obj } );
	} ); // end find
}; // end index

this.update = function(req, res){ }; // end update
