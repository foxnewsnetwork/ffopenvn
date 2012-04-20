/****************************
* Node Package Declarations *
*****************************/
var http = require( "http" );

// querystring for post formatting
var querystring = require("querystring");

/****************************
* Constant Configurations        *
*****************************/
var SHOP_SITE = "gamertiser.com" ,
	SHOP_PATH = "/api/v1/product.json" ,
	SHOP_PORT = 80,
	GAME_TOKEN = 12345 ,
	FAIL_PIC_PATH = "http://i299.photobucket.com/albums/mm281/foxnewsnetwork/1315348037812.jpg" ;
	
/****************************
* Class Declarations                   *
*****************************/
var ServerShop = function(){ 
	this.items;
	this.url;
	this.ip;
	
	/*
	dataspec = { 
		url : the url of the site you want to callshop on
		ip : the ip of the user calling the shop
		callback : a function you wish to have called when the store is ready
	};
	*/
	this.RequestItems = function(data, cb){ 
		var callback, metadata;
		if( data != undefined ){ 
			this.url = data['url']; 
			this.ip = data['ip']; 
			callback = data['callback'];
			metadata = data['metadata'];
		}
		if( cb != undefined ){ 
			callback = cb;
		}
		var rawquerydata = { token : GAME_TOKEN };
		if( this.url != undefined )
			rawquerydata['url'] = this.url;
		if( this.ip != undefined )
			rawquerydata['ip'] = this.ip;
		
		var querydata = querystring.stringify(rawquerydata);
		console.log( querydata );
		var options = { 
			host : SHOP_SITE,
			port : SHOP_PORT,
			path : SHOP_PATH + "?" + querydata
		};
		
		console.log(options);
		// This delegate goes into a thick stack and does work
		var inceptionDelegate = (function(shop){
			return function(items){ shop.items = items; };
		})(this);
		
		try{ 
			var request = http.get( options, function(response){ 
				if( response.statusCode > 400 ){
					console.log("Status Code: " + response.statusCode);
					if( callback != undefined ){
						var failitem = [{ 
							'description' : "Main shop site failed load",
							'id' : 12 ,
							'company_id' : 12 , 
							'tileset' :  FAIL_PIC_PATH ,
							'title' :  response.statusCode,
							'created_at' : Date.now() ,
							'updated_at': Date.now()
						}];
						callback( failitem );
					} // end callback if
					return;
				} // end statusCode if
				response.setEncoding('utf8');
			
				var contentlength = response.headers['content-length'];
				var currentlength = 0;
				var fillchunk = "";
				response.on( "data", function(chunk){ 
					currentlength += chunk.length;
					fillchunk += chunk;
					console.log( "Currently at " + currentlength + " out of " + contentlength );
					if( currentlength / contentlength > 0.995 ){
						var rawData = JSON.parse(fillchunk);
						var rawResult = rawData['results'];
						console.log(rawResult);
						var item, items=[];
						for( var k = 0; k < rawResult.length; k++ ){ 
							item = rawResult[k];
							items.push( { 
								'description': item['description'],
								'id': item['id'],
								'company_id': item['company_id'],
								'tileset': item['picture_path_thumb'],
								'price': item['cost'],
								'title': item['title'],
								'created_at': item['created_at'],
								'updated_at': item['updated_at']
							} ); // end push
						} // end for
						inceptionDelegate( items );
						if( callback != undefined ){
							callback( items );
						}
					} // end percentage completion if
				} ) // end response.on data
				.on( "error", function(error){ 
					console.log( error );
					return;
				} ); // end response.on error
			} ); // end http.get
			request.end();
		} //end try
		catch(err){ 
			console.log(err);
		} // end catch
	} // end this.RequestItems
	
	// Parameter explanations
	/**
		data = { 
			'productid' :
			'email' : 
			'name' :
			'creditcard' :
			'ccv' :
			'expirationmonth' :
			'expirationyear' :
			'username' :
			'playertoken' :
			'ip' :
			'url' :
			'gametoken':
		}
	*/
	this.BuyItem = function( data, callback ){ 
		// Step 1: Setup the request
		var tempdata = data;
		var postdata = querystring.stringify( data );
		var options = { 
			method : "POST",
			host : SHOP_SITE,
			port : SHOP_PORT,
			path : SHOP_PATH ,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': postdata.length
			}
		}; // end options
		
		try{
			// Step 2: Starting the request
			var request = http.request( options, function(response){ 
				// Handle 400 erros
				if( response.statusCode > 400 ){ 
					console.log( "We have encountered the error @ status code : " + response.statusCode );
					return;
				} // end statusCode if
			
				// Setup to receive information
				var fullsize = response.headers['content-length'];
				var currentsize = 0;
				var buffer = "";
				response.on( "data", function(chunk){ 
					currentsize += chunk.length;
					buffer += chunk;
					if( currentsize / fullsize > 0.995 ){ 
						var data = JSON.parse(buffer);	
						console.log( "Purchase status: " + buffer );
						if(callback != undefined)
							callback(data);
					} // end size check if
				} ); // end response.on data
			} ); // end http.request
		
			// Step 3: Write the post data and wait for the reply
			request.write(postdata);
			request.end();
		} //end try
		catch(err){ 
			console.log(err);
		} // end catch
	} // end this.BuyItem
}

this.InGidioShop = new ServerShop();
