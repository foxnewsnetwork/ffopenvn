socket.on( "connection", function(id) { 
	var data = { sid : $("#storyid").val() };
	socket.emit( "chapter edit connection" , data );		
} ); // end socket.on

var myvneditor;

socket.on( "chapter edit connection", function(rawdata) { 
	// Step 1: Load up the scenes
	myvneditor = new FFOpenVNEditor();
	var scenes = TreeSort( rawdata );
	var data = [];
	for ( var k = 0; k < scenes.length; k++ ) { 
		data.push( scenes[k]['data'] );
	} // end for
	if ( scenes == undefined || scenes.length == 0 ) { 
		alert( "It feels like I am wearing nothing at all... nothing at all.");
	} // end if
	else { 
		myvneditor.Load(data);
	} // end else
	
	
	
	// Step 2: Enter edit mode
	myvneditor.EnterEditMode( function(position) { return; } , function(size){ return; } );
	
	// Step 3: Setup up edit mode UI
	// TODO: Write me!
	
	// Step 4: Step up save system
	myvneditor.Keypress( function(e){ 
		if ( e.charCode == 13 ) { 
			var data = { 
				data : myvneditor.GetState() ,
				sceneid : scenes[myvneditor.count]._id
			}; // end data
			
			socket.emit( "chapter edit save", data );
		} // end if
	} ); // end keypress
	
	// Step 5: Initialize the actual VN
	myvneditor.Scene(0);
	
	// Step 6: Write the thing that determines endings
	myvneditor.End( function() { 
		myvneditor.Scene(0);
	} ); // end End
	
	myvneditor.Click( function() { 
		myvneditor.Next();
	} ); // end Click
	
} ); // end socket.on
