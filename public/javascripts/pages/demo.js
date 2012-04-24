/**
* Demo File
*/
// var PIC_REPO = "http://i299.photobucket.com/albums/mm281/foxnewsnetwork/";
var PIC_REPO = "images/"
var demodata = [
	{
		'background' : { 
			'image' :  PIC_REPO + "lvl1.png"
		} , 
		'foreground' : { 
			'images' : [],
			'positions' : []
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "Hi there, welcome to FFOpenVN. My master and I are building a visual novel creation and publication platform for all the writers, artists, and readers out there."
		}
	} , // end step 0
	{
		'background' : { 
			'image' :  PIC_REPO + "lvl1.png"
		} , 
		'foreground' : { 
			'images' : [],
			'positions' : []
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "But you've caught me at a bad time; we're still in the middle of construction... and Master currently isn't here right now."
		}
	} , // end step 1
	{
		'background' : { 
			'image' :  PIC_REPO + "lvl1.png"
		} , 
		'foreground' : { 
			'images' : [],
			'positions' : []
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "I'd love to offer you something to eat or drink, but I'm really poor right now (sorry). But if you'd like, I can show you around."
		}
	} , // end step 2
	{
		'background' : { 
			'image' :  PIC_REPO + "lvl1.png"
		} , 
		'foreground' : { 
			'images' : [],
			'positions' : []
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "When I finish this project, you would be able to start up your own fan fiction or original visual novel here."
		}
	} , // end step 3
	{
		'background' : { 
			'image' :  PIC_REPO + "lvl1.png"
		} , 
		'foreground' : { 
			'images' : [],
			'positions' : []
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "You'd be able to edit your VN online by yourself or with friends. I don't have any friends right now, so if you bring them here, please introduce them to me."
		}
	} , // end step 4
	{
		'background' : { 
			'image' :  PIC_REPO + "lvl1.png"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "upa.png"],
			'positions' : [{ x : 10, y : 10}] ,
			'sizes' : [{ width : 10, height : 10}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "Master is forcing me to paint a large set of stock backgrounds to chose from in case you don't want to make your own."
		}
	} , // end step 5
	{
		'background' : { 
			'image' :  PIC_REPO + "lvl1.png"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "upa.png"],
			'positions' : [{ x : 10, y : 10}] ,
			'sizes' : [{ width : 10, height : 10}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "Don't tell Master I told you this, but I think he also keeps lots of other girls like me locked up in here."
		}
	} , // end step 5
	{
		'background' : { 
			'image' :  PIC_REPO + "lvl1.png"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "upa.png"],
			'positions' : [{ x : 10, y : 10}] ,
			'sizes' : [{ width : 10, height : 10}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "I really want to see the world outside, but Master doesn't let me leave here. So please write me story and let me see the world through your imagination."
		}
	} , // end step 6
	{
		'background' : { 
			'image' :  PIC_REPO + "lvl1.png"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "upa.png"],
			'positions' : [{ x : 10, y : 10}] ,
			'sizes' : [{ width : 10, height : 10}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "If you'd, I'll even sell stuff like sweaters and such through your novel for you."
		}
	} , // end step 7
	{
		'background' : { 
			'image' :  PIC_REPO + "lvl1.png"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "upa.png"],
			'positions' : [{ x : 10, y : 10}] ,
			'sizes' : [{ width : 10, height : 10}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "Once you're done, you can publish it here with me or save it to your computer as an .exe file."
		}
	} , // end step 8
	{
		'background' : { 
			'image' :  PIC_REPO + "lvl1.png"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "upa.png"],
			'positions' : [{ x : 10, y : 10}] ,
			'sizes' : [{ width : 10, height : 10}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "Now everyone everywhere will be able to read your work. Hopefully, you'll become famous and someone at SHAFT will make an anime adaption of your work."
		}
	} ,// end step 9
	{
		'background' : { 
			'image' :  PIC_REPO + "lvl1.png"
		} , 
		'foreground' : { 
			'images' : [PIC_REPO + "upa.png"],
			'positions' : [{ x : 10, y : 10}] ,
			'sizes' : [{ width : 10, height : 10}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "I will let you know if THAT happens, but if not, I can at least keep track for you how your readers feel about your story and characters."
		}
	} , // end step 10
	{
		'foreground' : { 
			'images' : [PIC_REPO + "upa.png"],
			'positions' : [{ x : 10, y : 10}] ,
			'sizes' : [{ width : 10, height : 10}]
		} , 
		'text' : { 
			'speaker' : "Sayuka",
			'content' : "But unfortunately, FFOpenVN isn't fully ready yet. But I would love it if you could sign up to keep me company during the current alpha phase."
		}
	} // end step 10
];

var CURRENT_SCENE = 0;
$(document).ready( function(){
	var demovn = new FFOpenVN();
	demovn.PlayScene( demodata[0] );
	demovn.Next( function(){ 
		CURRENT_SCENE += 1;
		CURRENT_SCENE %= demodata.length;
		demovn.PlayScene( demodata[CURRENT_SCENE] );
	} );
} );
