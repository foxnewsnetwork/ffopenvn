socket.on( "connection", function(id) { 
	socket.emit( "page index connection", true );
	var form1 = "<ul class=\"signup\"><li class=\"signup\">";
	form1 += "<input id=\"name2\" class=\"signup\" type=\"text\" placeholder=\"Name...\" name=\"user[name]\" />";
	form1 += "<input id=\"email2\" class=\"signup\" type=\"text\" placeholder=\"Email...\" name=\"user[email]\" />";
	form1 += "</li><li class='signup'>";
	form1 += "<input id=\"password2\" class=\"signup\" type=\"password\" placeholder=\"Password...\" name=\"user[password]\" />";
	form1 += "<a id=\"submit2\" class='btn btn-primary btn-large obtrusive'>Request Invite</a>";
	form1 += "</li></ul>";
	
	var form2 = 	"<ul class=\"signup\" style=\"margin-left: -1em; margin-top: 0.5em;\"><li class=\"signup\">";
	form2 += "<input id=\"name3\" class=\"signup\" type=\"text\" placeholder=\"Name...\" name=\"user[name]\" />";
	form2 += "</li><li class='signup'>";
	form2 += "<input id=\"email3\" class=\"signup\" type=\"text\" placeholder=\"Email...\" name=\"user[email]\" />";
	form2 += "</li><li class='signup'>";
	form2 += "<input id=\"password3\" class=\"signup\" type=\"password\" placeholder=\"Password...\" name=\"user[password]\" />";
	form2 += "</li><li class='signup'>";
	form2 += "<a id=\"submit3\" class='btn btn-primary btn-large obtrusive'>Request Invite</a>";
	form2 += "</li></ul>";
	
	$("#signupbox-top").html(form1);
	$("#signupbox-bottom").html(form2);
	
	$("#submit2").click( function() { 
		var header = $("#hiddenheader").val();
		var referer = $("#hiddenreferer").val();
		var email = $("#email2").val();
		var name = $("#name2").val();
		var password = $("#password2").val();
		var regemail = /^[a-zA-Z0-9\-_.,%]{2,}@[a-zA-Z0-9\-_%,]{2,}\.[a-zA-Z0-9]{2,}$/;
		if ( !regemail.test( email ) ) { 
			$("#email2").css("border", "2px solid red");
			return;
		} // end if
		var data = { 
			email : email ,
			name : name ,
			password : password ,
			header : header ,
			referer : referer
		}; // end data
		socket.emit( "pages index submission" , data );
		return;
	} ); // end submit
	
	$("#submit3").click( function() { 
		var header = $("#hiddenheader").val();
		var referer = $("#hiddenreferer").val();
		var email = $("#email3").val();
		var name = $("#name3").val();
		var password = $("#password3").val();
		var regemail = /^[a-zA-Z0-9\-_.,%]{2,}@[a-zA-Z0-9\-_%,]{2,}\.[a-zA-Z0-9]{2,}$/;
		if ( !regemail.test( email ) ) { 
			$("#email3").css("border", "2px solid red");
			return;
		} // end if
		var data = { 
			email : email ,
			name : name ,
			password : password ,
			header : header ,
			referer : referer
		}; // end data
		socket.emit( "pages index submission" , data );
		return;
	} ); // end submit
} ); // end on connection

socket.on( "pages index submission", function(result) { 
	var reclink = result['reclink'];
	var error = result['error'];
	if ( error ) { 
		// TODO: handle error
		Flash( "It looks like you've already signed up using that email" );
	} // end if
	else { 
		$("#signupbox-top").html("<div class='flash'><h2>Thanks for signing up. We're not quite ready for you yet, but we'll let you know when we are through email. </h2></div>");
		$("#signupbox-bottom").html("<div class='flash'><h2>Thanks for signing up. We're not quite ready for you yet, but we'll let you know when we are through email. </h2></div>");
	} // end else
} ); // end page index submission

function Flash( msg ) { 
	tooltip.show( "<h1>" + msg + "</h1>" );
	var t = setTimeout( "tooltip.hide()", 4000 );
} // end Flash
