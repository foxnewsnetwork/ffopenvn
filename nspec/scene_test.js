/**
* Model Test: Scene 
*/
var sceneSchema = require("../original_modules/scene.js");
var Scene = sceneSchema.Scene;

/**
* Test 1: Initialization & (hopefully no) recursion
*/
Scene.remove();
var root = new Scene( { 
	story_id : 1 ,
	title : "Faggot" ,
	data : { content : "level 0, root" }
} ); // end root
root.save();

for (var k = 0; k < 3; k++) { 
	var level1 = root.new();
	level1.data = { content : "level 1, child number " + k };
	level1.save();
	for( var j = 0; j < 2; j++){ 
		var level2 = level1.new();
		level2.data = { content : "level 2, child number " + j };
		level2.save();
		for( var l = 0; l < 3; l++){ 
			var level3 = level2.new();
			level3.data = { content : "level 3, child number " + l };
			level3.save();
		} // end for
	} //end for
} //end for

/**
* Test 2: Walking Forward
*/

Scene.find({ _id : root._id }, function(err, obj){ 
	if( obj == undefined ){ 
		console.log("Tests failed");
	}	// end if
	else{ 
		var l0 = obj[0];
		console.log(l0);
		
		l0.next( function(child){
			var l1 = child;
			console.log( l1 );
			if( l1.data.content != "level 1, child number 0" ){ 
			console.log( "Test failed" );
			} // end if
			else{ 
				console.log( "Test passed" );
			} //end else
			
			l1.next( function(child){ 
				var l2 = child;
				console.log( l2.data );
				if( l2.data.content != "level 2, child number 1" ){ 
					console.log( "Test failed");
				} //end if
				else{ 
					console.log( "Test passed" );
				} //end else
				
				l2.next( function(child){ 
					var l3 = child;
					console.log( l3.data.content );
					if( l3.data.content != "level 3, child number 2" ){ 
						console.log( "Test failed");
					} //end if
					else{ 
						console.log( "Test passed" );
					} //end else
					
					/**
					* Test 3: Walking Backward
					*/
					l3.previous( function(parent){ 
						var lv2 = parent;
						console.log(lv2);
						
						if ( lv2.data.content != "level 2, child number 1" ) { 
							console.log( "Test failed" );
						} //end if
						else { 
							console.log( "Test passed" );
						}  //end else
						
						lv2.previous( function(parent){ 
							var lv1 = parent;
							console.log(lv1);
							
							if ( lv1.data.content != "level 1, child number 0" ) { 
								console.log( "Test failed" );
							} // end if 
							else { 
								console.log( "Test passed" );
							} //end else
						} ); //end lv2.previous
					} ); // end l3.previous
				}, 2 ); // end l2.next
			}, 1 ); // ned l1.next
		} ); // end l0.next
	} // end else
} ); // end find
