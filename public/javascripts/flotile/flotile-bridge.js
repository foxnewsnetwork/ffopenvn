/**
* Flotile Bridge Class
*/
 // Bridging the gap between haxe and standard javascript
var FFOpenVN = character.VisualNovel;
var FFOpenVNEditor = character.VisualNovelEditor;

// Sorts a vector into an array tree
function TreeSort(vector) { 
	// Step 1: Finding the head
	var head;
	var temphash = {};
	for ( var k = 0; k < vector.length; k++ ) { 
		if ( vector[k].parent == undefined ) { 
			head = vector[k];
		} // end if
		temphash[vector[k]._id] = vector[k];
	} // end for
	


	// Step 2: Traversing to put in order
	var ordered = [], count = 0;
	var node = head;
	for( var k = 0; k < vector.length; k++ ) {
		ordered.push( node );
		var children = node.children;
		if ( children == undefined ) { 
			break;
		} // end if
		node = temphash[children[0]];
	} // end while
	
	// Step 3: We should return in on average o(1.5n)
	return ordered;
} // end TreeSort
