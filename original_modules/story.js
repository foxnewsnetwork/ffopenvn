// mongoose for mongodb storage
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/my_ffopenvn_database');

var chapterType = require("./chapter.js");
var Chapter = chapterType.Chapter;
var ChapterSchema = chapterType.Schema;

/****************************
* MongoDB Configuration           *
*****************************/
// Defining the schema and whatnot
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// The one and only schematic that ships with the server
var StorySchema = new Schema( { 
	id : ObjectId ,
	title : { type : String , default : "Untitled Story" },
	category : { type : String , set : toNormalized } ,
	cover : { type : String , default : "/images/ffopenvn.png" } ,
	owner : { type : String , default : "anonymous" } ,
	owner_name : { type : String, default : "anonymous" } ,
	collaborators : [String] ,
	start : String ,
	chapters : {} ,
	summary : { type : String, default : "Nothing here yet" } ,
	data : {}
} ); // end Schema
// chapters are also stored in a linked hash

function toNormalized( v ) { 
	var str = v;
	var regex = /\W+/;
	str.replace( regex, "" );
	return str.toLowerCase();
} // end toNormalized

// returns the first chapter 
StorySchema.methods.first = function(){ 
	return this.chapters[this.start];
}; // end start

StorySchema.pre( "save", function (next) { 
	if ( this.chapters == undefined ) { 
		this.chapters = {};
	}  // end if
	if ( this.start == undefined ) { 
		var chapter = new Chapter( { 
			story_id : this._id
		} ); // end new chapter
		chapter.save();
		this.chapters[chapter._id] = chapter;
		this.start = chapter._id;
		next();
	} // end if
} ); // end save

// Defining the model
mongoose.model( "StoryModel", StorySchema );
this.Story = mongoose.model( "StoryModel" ); 
