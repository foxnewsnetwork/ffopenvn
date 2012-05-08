
/**
 * Module dependencies.
 */
// Express
var express = require('express')
  , routes = require('./routes');
var Resource = require('express-resource');
var app = module.exports = express.createServer();

var Player = require( "./original_modules/player.js" ).Player;
// suckit.IO for RESTful socket.IO usage
var suck = require("./original_modules/suckitio.js").listen(app);

// GeoIP
var geoip = require("geoip-lite");

/**
* Server Configuration
*/
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret : " faggots r us" }) );
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.favicon(__dirname + "/public/images/favicon.ico") );
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

/**
* Routes
*/
// Data dumping
app.get( "/datadump/:username/password/:password", function(req, res) { 
	var login = req.params.username;
	var password = req.params.password;
	console.log( req.params );
	if ( login == "foxnewsnetwork" && password == "wtfisthisbullshit11" ){ 
		Player.find( {}, function(err, obj) { 
			res.send( JSON.stringify(obj) );
		} ); // end find
	}  // end if
	else { 
		res.send( "What you are looking for is not here, please move along" );
	} // end else
} ); // end get

// Page manager
app.get( '/', function(req, res){ 
	
	var useragent = req.headers['user-agent'];
	var macregex = /mac/i;
	var ismac = macregex.test( useragent );
	var referer = "none";
	var data = { 
		title : "FFOpenVN", 
		count : 0, 
		player : req.session.user ,
		laptop : "/images/splash-mac.png" ,
		header : JSON.stringify( req.headers ) ,
		referer : referer ,
		flash : req.flash("user create")
	}; // end data
	if ( !ismac ) { 
		data['laptop'] = "/images/splash-pc.png";
	} // end if
	var ip = req.connection.remoteAddress;
	if ( (/^127/).test(ip) ) { 
		res.render("pages/index.ja.jade", data );
		return;
	} // end if
	var country = geo['country'];
	if ( (/japan/i).test( country ) ) { 
		res.render( "pages/index.ja.jade", data );
	} // end if
	else { 
		res.render("pages/index.jade", data );
	} // end else
} ); //end get

app.get( '/referer/:id', function(req, res){ 
	var useragent = req.headers['user-agent'];
	var macregex = /mac/i;
	var ismac = macregex.test( useragent );
	var referer = req.params['id'];
	var data = { 
		title : "FFOpenVN", 
		count : 0, 
		player : req.session.user ,
		laptop : "/images/splash-mac.png" ,
		header : JSON.stringify( req.headers ) ,
		referer : referer,
		flash : req.flash("user create")
	}; // end data
	if ( !ismac ) { 
		data['laptop'] = "/images/splash-pc.png";
	} // end if
	res.render("pages/index.jade", data );
} ); //end get

// User Sessions login
app.post("/user/login", function(req, res) { 
	var params = req.body.user;
	Player.login( { email : params['email'], password : params['password'] }, function(err, user) { 
		if ( err ) { 
			// TODO: handle error
			console.log(err);
			req.flash( "login", "Incorrect login info, sorry buddy" );
		} // end if
		else { 
			req.session.user = user;
			console.log(user);
			req.flash( "login", "Login successful" );
		} // end else
		res.redirect("back");
	} ); // end login
} ); // end 

/**
* Resources
*/
// app.resource( "artist", require("./resources/artist.js") );
app.resource( "story", require("./resources/story.js") );
app.resource( "chapter", require("./resources/chapter.js") );
app.resource( "user", require("./resources/user.js") );
// app.resource( "scene", require("./resources/scene.js") );

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


