// mongoose for mongodb storage
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/my_ffopenvn_database');

// Password encryption use
var md5 = require( "MD5" );

/****************************
* MongoDB Configuration           *
*****************************/
// Defining the schema and whatnot
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// The one and only schematic that ships with the server
var PlayerSchema = new Schema( {
	id : ObjectId ,
	name : { 
		type : String ,
		required : true ,
		index : { unique : true, sparse : true }
	 } ,
	email : { 
		type  : String, 
		match : /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/ ,
		required : true ,
		index : { unique : true, sparse : true } 
	 } ,
	password : { type : String } ,
	salt : { type : String } ,
	playertoken : { type : String } ,
	score : { type : Number , default : 0 } ,
	coins : { type : Number , default : 0 } ,
	created_at : { type : Date, default : Date.now } ,
	updated_at : { type : Date, default : Date.now }
} );

// Writting in some setters
PlayerSchema.path("email").set( function(v){ 
	return v.toLowerCase();
} );

PlayerSchema.path("name").set( function(v){ 
	return v.toLowerCase();
} );



// Writting the middleware to do encryption
PlayerSchema.pre( "save", function(next){ 
	if( this.salt == undefined ){
		var saltString = this.created_at + "--" + this.password;
		var salt = md5( saltString );
		var pwstring = this.password + "--" + salt;
		var epassword = md5( pwstring );
		this.password = epassword;
		this.salt = salt;
	}
	next();
} );

// Writing the login functions
PlayerSchema.statics.login = function( userInfo, callback ){
	var pw = userInfo['password'];
	var email = userInfo['email'];
	
	// Step 1: Do a query for the user
	var quResult;
	var qu = this.find( { "email" : email.toLowerCase() }, function(err, obj){ 
		if( err ){
			callback( "HOLY SHIT, INTERNAL SERVER ERROR ENCOUNTERED!" );
			// todo: otherstuff
			return;
		}
		quResult = obj;
		
		// Case 1: the email doesn't exist
		if( quResult.length != 1 ){
			callback( "no such user OR too many users" );
			return qu;
		}
		
		// Step 2: We hash the password
		var user = quResult[0];
//		console.log( "Attempted Email: " + email + " and Attempted PW: " + pw );
//		console.log( "Actual email: " + user.email + " and actual PW: " + user.password );
		var epassword = md5( pw + "--" + user.salt );
		
		// Case 2: the wrong password is given
		if( user.password != epassword ){ 
//			console.log( "found hash: " + user.epassword + " versus attempted hash: " + epassword );
			callback( "incorrect password" );
			return qu;
		}
		else{ // Correct login
			callback( undefined, user );
			return qu;
		}
	} );
};

// Defining the model
mongoose.model( "PlayerModel", PlayerSchema );
this.Player = mongoose.model( "PlayerModel" ); 


