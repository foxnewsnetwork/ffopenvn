
/**
 * Module dependencies.
 */
// Express
var express = require('express')
  , routes = require('./routes');
var Resource = require('express-resource');
var app = module.exports = express.createServer();

// suckit.IO for RESTful socket.IO usage
var suck = require("./original_modules/suckitio.js").listen(app);

/**
* Server Configuration
*/
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
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
// Page manager
app.get( '/', function(req, res){ 
	res.render("pages/index.jade", { title : "FFOpenVN * alpha", count : 0 } );
} ); //end get

app.get( '/demo/:id', function(req, res){ 
	res.render("pages/index.jade", { title : "FFOpenVN * alpha", count : req.params['id'] } );
} ); //end get

/**
* Resources
*/
// app.resource( "artist", require("./resources/artist.js") );
app.resource( "story", require("./resources/story.js") );
app.resource( "chapter", require("./resources/chapter.js") );
// app.resource( "scene", require("./resources/scene.js") );

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


