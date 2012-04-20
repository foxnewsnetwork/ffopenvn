/*************************
* A / B Constants                  *
**************************/
var ANALYTICS_SITE = "gamertiser.com" ,
	ANALYTICS_PATH = "/api/v1/stats" ,
	ANALYTICS_PORT = 80,
	GAME_TOKEN = 12345 ,
	ANALYTICS_STORAGE = "./public/analytics/";
	
/****************************
* Node Package Declarations *
*****************************/
// for communication
var http = require( "http" );

// querystring for post formatting
var querystring = require("querystring");

// for file-storage service
var fs = require("fs");

/*************************
* A / B Test Management   *
**************************/
// This class will handle the good ol' stuff with ab testing
var SplitTest = function(){ 
	this.beta = {};
	// Records the user's ip, starts tracking.
	// returns true if the user is placed in the beta group
	// false otherwise
	this.AddUser = function(ip){ 
		// TODO: implement the function description
		// For now, it just returns true 40% of the time
		var chance = Math.floor(Math.random() * 100);
		if( chance < 40 ){
			this.beta[ip] = true;
			return true;
		}//end if
		else{
			this.beta[ip] = false;
			return false;
		} //end else
	} // end AddUser
	
	// Sends analytics to gamertisers as well as save a local copy
	this.SendAnalytics = function(data){ 
		var ip = data['ip'];
		var rawquerydata = data;
		rawquerydata['beta'] = this.beta[ip];
		rawquerydata['gametoken'] = GAME_TOKEN;
		var querydata = querystring.stringify(rawquerydata);
		var logdata = JSON.stringify(rawquerydata);
		var options = { 
			method : "POST",
			host : ANALYTICS_SITE,
			port : ANALYTICS_PORT,
			path : ANALYTICS_PATH ,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': querydata.length
			} // end headers
		}; // end options
		
		try{
			console.log( logdata );
			fs.createWriteStream( ANALYTICS_STORAGE + "abtest.log", {
				flags: "a",
				encoding: "encoding",
				mode: 0666
			}).write(logdata);		
		 
			var request = http.request(function(response){ 
				response.on("data", function(chunk){ 
					console.log(chunk);
				}); //end response.on
			}); // end request
			request.write(querydata);
			request.end();
		} // end try
		catch(err){ 
			console.log(err);
		} // endcatch
	} // end SendAnalytics
} // end SplitTest

// Exposed API
this.ABTestManager = new SplitTest();
