// mongoose for mongodb storage
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/my_ffopenvn_database');

var chapterType = require("./chapter.js");
var Chapter = chapterType.Chapter;
var ChapterSchema = chapterType.ChapterSchema;

/****************************
* MongoDB Configuration           *
*****************************/
// Defining the schema and whatnot
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// The one and only schematic that ships with the server
var StorySchema = new Schema( { 
	id : ObjectId ,
	title : String ,
	category : String ,
	cover : String ,
	owner : String ,
	collaborators : [String] ,
	start : String ,
	chapters : {} ,
	data : {}
} ); // end Schema
// chapters are also stored in a linked hash

// returns the first chapter 
StorySchema.methods.first = function(){ 
	return this.chapters[this.start];
}; // end start

// Defining the model
mongoose.model( "StoryModel", StorySchema );
this.Story = mongoose.model( "StoryModel" ); 
