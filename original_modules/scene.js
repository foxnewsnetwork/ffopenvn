// mongoose for mongodb storage
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/my_ffopenvn_database');

/****************************
* MongoDB Configuration           *
*****************************/
// Defining the schema and whatnot
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// The one and only schematic that ships with the server
/** 
* data = {
* pic : [picobjects]
* text : String
* miscellanious stuff coming soon
* } 
*/
var SceneSchema = new Schema( { 
	id : ObjectId ,
	story_id : String ,
	title : String ,
	parent : String ,
	children : [String] ,
	data : {}
} ); // end Schema
// except for root scenes all scenes also have a parent scene
// except for leaf scenes, all scenes also have children scenes

// choice is a integer and always defaults to 0
SceneSchema.methods.next = function(callback, choice){ 
	if( callback == undefined ){ 
		return;
	} // end if
	var sm = mongoose.model( "SceneModel" ); 
	var selection = choice || 0;
	sm.findOne( { _id : this.children[selection] }, function(err,obj){ 
		if( err ){ 
			console.log(err);
			callback(err);
		} // end if
		else{ 
			callback(obj);
		} // end if
	} ); // end find
}; // end next

SceneSchema.methods.previous = function(callback){ 
	if( callback == undefined ){ 
		return;
	} // end if
	var sm = mongoose.model( "SceneModel" ); 
	sm.findOne({ _id : this.parent }, function(err, obj){ 
		if( err ){ 
			console.log(err);
			callback(err);
		} //end if
		else{ 
			callback(obj);
		} //end else
	} ); //end findOne
}; // end previous

SceneSchema.methods.new = function(data){ 
	var sm = mongoose.model( "SceneModel" );
	var scene = new sm({ 
		title : "Untitled" ,
		story_id : this.story_id ,
		parent : this._id ,
		data : data
	} );	// end sm
	scene.save();
	if( this.children == undefined){ 
		this.children = [];
	} // end if
	this.children.push(scene._id);
	this.save();
	return scene;
}; // returns a new scene

SceneSchema.pre( 'remove', function(next){
	// Step 1: updates the children
	if( this.children != undefined ){ 
		// TODO: write me
	} //end if
	
	// Step 2: remove self from the parent
	if( this.parent != undefined ){ 
		// TODO: write me
	} // end if
} ); //end pre

// Defining the model
mongoose.model( "SceneModel", SceneSchema );
this.Scene = mongoose.model( "SceneModel" ); 

