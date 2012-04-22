// mongoose for mongodb storage
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/my_ffopenvn_database');

var sceneSchema = require("./scene.js");
var Scene = sceneSchema.Scene;

/****************************
* MongoDB Configuration           *
*****************************/
// Defining the schema and whatnot
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// The one and only schematic that ships with the server
var StorySchema = new Schema( { 
	id : ObjectId ,
	owner_id : String ,
	scene : Scene
} ); // end Schema

// returns the 
StorySchema.methods.start = function(){ 
	return this.scene;
}; // end start

// Defining the model
mongoose.model( "StoryModel", StorySchema );
this.Story = mongoose.model( "StoryModel" ); 
