
// contains everything for the notifications.
Meteor.startup(function () {
	var hasFocus;
	var noteCount 	= 0;
	var currentTime = Math.round(new Date().getTime() / 1000); //Unix timestamp in seconds.
	var sound = new Audio("notification.mp3"); // buffers automatically when created

	// Check for new messages
	//  add notifiction if new message arives and the page has no focus.
	Messages.find({created: {$gt: currentTime}}).observe({
	    added: function(item) {
	    	if (!hasFocus) {
		    	noteCount++;
		     	sound.play();
		     	Tinycon.setBubble(noteCount);
		    }
	    }
	});

	// Check if the page has focus or not.
	$(window).focus(function() {
		hasFocus = true;
		noteCount = 0;
		Tinycon.setBubble(noteCount);
	})
	.blur(function() {
		hasFocus = false;
	});

});
