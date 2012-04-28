// mongoose for mongodb storage
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/my_ffopenvn_database');

var sceneType = require('./scene.js');
var Scene = sceneType.Scene;
var SceneSchema = sceneType.Schema;

/****************************
* MongoDB Configuration           *
*****************************/
// Defining the schema and whatnot
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// The one and only schematic that ships with the server
var ChapterSchema = new Schema( { 
	id : ObjectId ,
	story_id : String ,
	title : { type : String , default : "Untitled Chapter" },
	parent : String ,
	children : [String] ,
	start : String ,
	scenes : {}
} ); // end Schema
// scenes are stored in what I will call a linked hash

// methods creates a child chapter
ChapterSchema.methods.new = function(){ 
	// Step 1: creating the child
	var cm = mongoose.model("ChapterModel");
	var Story = mongoose.model( "StoryModel" );
	var chapter = new cm( {
		story_id : this.story_id ,
		parent : this._id	
	} ); // end chapter
	chapter.save();
	
	// Step 2: Updating the parents
	if( this.children == undefined ){ 
		this.children = [];
	}  // end if
	this.children.push[chapter._id];
	this.chapter.save();
	
	// Step 3: Updating the meta environment
	Story.findOne( { _id : this._id } , function(err, obj) { 
		if (err) { 
			// TODO: handle error
		} // end if
		else { 
			var story = obj;
			story.chapters[chapter._id] = chapter;
			story.save();
		} // end else
	} ); // end findOne
	return chapter;
}; // end new

ChapterSchema.pre( "save", function( next ) { 
	if ( this.scenes == undefined ) { 
		this.scenes = {};
	} // end if
	if( this.start == undefined ) { 
		var scene = new Scene( {
			chapter_id : this._id ,
		} ); // end new scene
		scene.save();
		this.scenes[scene._id] = scene;
		this.start = scene._id;
		next();
	}  // end if
} ); // end pre save

ChapterSchema.methods.first = function(){ 
	return this.scenes[this.start];
}; // end first

ChapterSchema.methods.next = function(choice){ 
	var selection = choice || 0;
	return this.children[selection];
}; // end next

ChapterSchema.methods.previous = function(){ 
	return this.parent;
}; // end previous

// Defining the model
mongoose.model( "ChapterModel", ChapterSchema );
this.Chapter = mongoose.model( "ChapterModel" ); 
this.Schema = ChapterSchema;
