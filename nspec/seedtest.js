/**
* Testing for Correct Data Seeind
*/
var Story = require("../original_modules/story.js").Story;
var Chapter = require("../original_modules/chapter.js").Chapter;
var Scene = require("../original_modules/scene.js").Scene;

/**
* Tests
*/
Story.findOne({}, function(err,story){ 
	Chapter.findOne( { _id : story.first() }, function(err, chapter){ 
		Scene.findOne( { _id : chapter.first() }, function(err, scene){ 
			console.log( scene );
		} ); // end scene
	} ); // end chapter
} ); // end Story
