// mongoose for mongodb storage
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/my_ffopenvn_database');

var sceneSchema = require('./scene.js');
var Scene = sceneSchema.Scene;

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
	title : String ,
	scene : Scene
} ); // end Schema

// Defining the model
mongoose.model( "ChapterModel", ChapterSchema );
this.Chapter = mongoose.model( "ChapterModel" ); 
