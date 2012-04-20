// mongoose for mongodb storage
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/my_gameserver_database');

/****************************
* MongoDB Configuration           *
*****************************/
// Defining the schema and whatnot
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CommentSchema = new Schema( {
	id : ObjectId ,
	content : { type : String },
	created_at : { type : Date, default : Date.now } ,
	updated_at : { type : Date, default : Date.now } ,
	ip : { type : String }
} );

CommentSchema.statics.GetLatest = function(callback, count){ 
	var c = count || 10;
	this.find({}).sort("created_at", "descending").limit(c).run(function(err,obj){ 
		console.log( err );
		if( err ){ 
			console.log("oh no");
		}
		else
			callback( obj );
	}); // end run
}; // end GetLatest

// Defining the model
mongoose.model( "CommentModel", CommentSchema );
this.Comment = mongoose.model( "CommentModel" ); 


