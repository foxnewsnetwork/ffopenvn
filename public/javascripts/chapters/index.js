socket.on( "connection", function(id) { 
	var data = { sid : $("#sid").val() };
	socket.emit( "chapter index connection" , data );		
} ); // end socket.on

var freeChapters;
socket.on( "chapter index connection", function( story ) { 
	freeChapters = story.chapters;
	$("#storyname").html("<h1>" + story.title + "</h1>");
	if (freeChapters == undefined) { 
		$( "#treeview" ).html( "Nothing here yet" );
	}  // end if
	else { 
		// creates an array of many arrays
		var html = ExposeChildren2html( chapters[story.first], "treeview" );
		$("#treeview").html( html );
	} // end else
} ); // end on

function ExposeChildren2html( kids, identifier ){ 
	if ( kids == undefined || kids.length == 0 ) { 
		return "";
	} // end if
	var output = "<ul class='" + identifier+ "'>";
	for( var k = 0; k < kids.length; k++ ) { 
		var temp = ExposeChildren2html( GetChildren( kids[k] ), identifier );
		if( temp == "" ) { 
			continue;
		} // end if
		output += "<li class='" + identifier + "'>";
		output += temp;
		output += "</li>";
	} // end for
	output += "</ul>";
	return output;
}; // end ExposeChildren

function GetChildren(parent) {
	var children = [];
	for( var k = 0; k < parent.children.length; k++ ) { 
		children.push( freeChapters.chapters[parent.children[k]] );
	} // end for
	return children;
} ; // end GetChildren
