$(document).ready(function(){ 
	$("#refreshpage").click( function(){ 
		location.reload();
	} ); // end click
} ); // end ready

var Flash = (function() { 
	return function(message, time) { 
		var t = time || 3000;
		tooltip.show(message);
		setTimeout( "tooltip.hide()", t );
	}; // end function
})(); // end Flash
