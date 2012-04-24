/**
* Demo File
*/
// var PIC_REPO = "http://i299.photobucket.com/albums/mm281/foxnewsnetwork/";
var PIC_REPO = "images/demo/"
var demodata = [
	{
		'background' : { 
			'image' :  PIC_REPO + "bg.jpg"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p3e1.png"],
			'positions' : [{ x : 25, y : 8}],
			'sizes' : [{ width : 32, height : 93}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "Hi there, welcome to FFOpenVN. My master and I are building a visual novel creation and publication platform for all the writers, artists, and readers out there."
		}
	} ,// end step 0
	{
		'background' : { 
			'image' :  PIC_REPO + "bg.jpg"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p1e1.png"],
			'positions' : [{ x : 32, y : 8}],
			'sizes' : [{ width : 20, height : 93}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "I wasn't expecting guests this early. I'm still just putting my boxes away... and Master currently isn't here right now."
		}
	}, // end step 1
	{
		'background' : { 
			'image' :  PIC_REPO + "bg.jpg"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p1e2.png"],
			'positions' : [{ x : 32, y : 8}],
			'sizes' : [{ width : 20, height : 93}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "I'd love to offer you something to eat or drink, but I'm really poor right now (sorry). But if you'd like, I can show you around."
		}
	} , // end step 2
	{
		'background' : { 
			'image' :  PIC_REPO + "step1.jpg"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p1e2.png"],
			'positions' : [{ x : 4, y : 8}],
			'sizes' : [{ width : 20, height : 93}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "Here, you'll be able to start writing your own visual novels (like this one, but better)."
		}
	} , // end step 3
	{
		'background' : { 
			'image' :  PIC_REPO + "step2.jpg"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p2e2.png"],
			'positions' : [{ x : 0, y : 8}],
			'sizes' : [{ width : 35, height : 93}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "You'd be able to edit your VN online by yourself or with friends. I don't have any friends right now, so if you bring them here, please introduce them to me."
		}
	} , // end step 4
	{
		'background' : { 
			'image' :  PIC_REPO + "Step3.jpg"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p2e2.png"],
			'positions' : [{ x : 0, y : 8}],
			'sizes' : [{ width : 35, height : 93}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "Master is forcing me to paint a large set of stock backgrounds to chose from in case you don't want to make your own."
		}
	} , // end step 5
	{
		'background' : { 
			'image' :  PIC_REPO + "Step4.jpg"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p2e2.png", PIC_REPO + "00.png"],
			'positions' : [{ x : 0, y : 8}, { x : 75, y : 22}],
			'sizes' : [{ width : 35, height : 93}, { width : 15, height : 80}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "He also keeps a lot of girls like me and Madoka for future artists to use. "
		}
	} , // end step 6
	{
		'background' : { 
			'image' :  PIC_REPO + "Step4.jpg"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p2e2.png", PIC_REPO + "00.png"],
			'positions' : [{ x : 0, y : 8}, { x : 75, y : 22}],
			'sizes' : [{ width : 35, height : 93}, { width : 15, height : 80}]
		} , 
		'text' : { 
			'speaker' : "Madoka",
			'content' : "Onee-chan, is it time for my cameo yet? "
		}
	} , // end step 7
	{
		'background' : { 
			'image' :  PIC_REPO + "step5.jpg"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p1e2.png"],
			'positions' : [{ x : 1, y : 8}],
			'sizes' : [{ width : 20, height : 93}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "I really want to see the world outside, but Master doesn't let me leave here. So please write me story and let me see the world through your imagination."
		}
	} , // end step 8
	{
		'background' : { 
			'image' :  PIC_REPO + "step55.jpg"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p1e2.png"],
			'positions' : [{ x : 1, y : 8}],
			'sizes' : [{ width : 20, height : 93}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "If you'd like, Madoka and I can even sell real stuff for you through your visual novel."
		}
	} , // end step 9
	{
		'background' : { 
			'image' :  PIC_REPO + "step55.jpg"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p1e2.png"],
			'positions' : [{ x : 1, y : 8}],
			'sizes' : [{ width : 20, height : 93}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "If you'd like, Madoka and I can even sell real stuff for you through your visual novel."
		}
	} , // end step 10
	{
		'background' : { 
			'image' :  PIC_REPO + "step6.jpg"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p3e1.png"],
			'positions' : [{ x : 1, y : 8}],
			'sizes' : [{ width : 35, height : 93}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "Once you're done, you can publish it here with me or save it to your computer as an .exe file."
		}
	} , // end step 11
	{
		'background' : { 
			'image' :  PIC_REPO + "step7.jpg"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p3e1.png"],
			'positions' : [{ x : 1, y : 8}],
			'sizes' : [{ width : 35, height : 93}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "Now everyone everywhere will be able to read your work. Hopefully, you'll become famous and someone at SHAFT will make an anime adaption of your work."
		}
	} , // end step 12
	{
		'background' : { 
			'image' :  PIC_REPO + "step8.jpg"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p2e3.png"],
			'positions' : [{ x : 1, y : 8}],
			'sizes' : [{ width : 35, height : 93}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "I will let you know if THAT happens, but if not, I can at least keep track for you how your readers feel about your story and characters."
		}
	} , // end step 12
	{
		'foreground' : { 
			'images' : [PIC_REPO + "sayuka-p1e1.png"],
			'positions' : [{ x : 72, y : 8}] ,
			'sizes' : [{ width : 20, height : 93}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "But unfortunately, FFOpenVN isn't fully ready yet. But I would love it if you could sign up to keep me company while I build the rest of this. If you'd like to email master and give him feedback, here is his email : mmnashi90@gmail.com."
		}
	} // end step 13
]; // end demodata

var CURRENT_SCENE = 0;
$(document).ready( function(){
	$(".hero-unit").hide();
	var demovn = new FFOpenVN();
	demovn.PlayScene( demodata[0] );
	demovn.Next( function(){ 
		if (CURRENT_SCENE == demodata.length - 2 ) { 
			$(".hero-unit").show();
		} // end if
		CURRENT_SCENE += 1;
		CURRENT_SCENE %= demodata.length;
		demovn.PlayScene( demodata[CURRENT_SCENE] );
	} ); // end next
	$("a").mouseover(tooltip.show("Feature not ready yet!"));
	$("a").mouseleave(tooltip.hide());
} ); // end ready

socket.on( "connection", function(id) { 
	$("#signup").click(function(){
		var email = $("#email").val();
		var regemail = /^[a-zA-Z0-9\-_.,%]{2,}@[a-zA-Z0-9\-_%,]{2,}\.[a-zA-Z0-9]{2,}$/;
		if (regemail.test(email)) { 
			var data = { 
			email : email
			}; // end data
			thoughts.FireAdmin( "data up", data );
		} // end if
		else { 
			$("#email").css("border", "2px solid red");
		} // end else
		
	} ); // end click
	
	thoughts.AddAdmin( "data down", function(result) { 
		$("#signupbox").html("<div id='thx4'><h3>Thanks for signing up!</h3></div>");
	} ); // end AddAdmin
} ); // end on
