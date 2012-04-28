/**
* Run this to kill everything
*/
var Story = require("../original_modules/story.js").Story;
var Chapter = require("../original_modules/chapter.js").Chapter;
var Scene = require("../original_modules/scene.js").Scene;

Story.remove({}, function(err) { console.log( "Stories purged" ); } );
Chapter.remove({}, function(err) { console.log( "Chapters purged" ); } );
Scene.remove({}, function(err) { console.log( "Scenes purged" ); } );
