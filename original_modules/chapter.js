// mongoose for mongodb storage
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/my_ffopenvn_database');

var sceneType = require('./scene.js');
var Scene = sceneType.Scene;
var SceneSchema = sceneType.SceneSchema;

/****************************
* MongoDB Configuration           *
*****************************/
// Defining the schema and whatnot
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// The one and only schematic that ships with the server
this.ChapterSchema = new Schema( { 
	id : ObjectId ,
	story_id : String ,
	title : String ,
	parent : String ,
	children : [String] ,
	scenes : {}
} ); // end Schema
// scenes are stored in what I will call a linked hash

// methods creates a child chapter
this.ChapterSchema.methods.new = function(){ 
	var cm = mongoose.model("ChapterModel");
	var chapter = new cm( {
		story_id : this.story_id ,
		parent : this._id	
	} ); // end chapter
}; // end new

this.ChapterSchema.methods.next = function(choice){ 
	var selection = choice || 0;
	return this.children[selection];
}; // end next

this.ChapterSchema.methods.previous = function(){ 
	return this.parent;
}; // end previous

// Defining the model
mongoose.model( "ChapterModel", this.ChapterSchema );
this.Chapter = mongoose.model( "ChapterModel" ); 
