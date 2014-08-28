Router.configure({
	layoutTemplate: 'master',
	loadingTemplate: 'loading',
  	notFoundTemplate: 'notfound',
	waitOn: function() {
		return [Meteor.subscribe('users'), Meteor.subscribe('messages')];
	}
});

Router.map(function() {
	this.route('chat', { path: '/' });
	this.route('about');
	this.route('admin', {
		onBeforeAction: function() {
	    	var user  = Meteor.user();
	    	var level = user && user.level;

	    	if (level < 5) {
	        	this.redirect('chat');
	    	}
	    	return true;
	    }
	});
});