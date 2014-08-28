Handlebars.registerHelper('minLevel', function (level) {
    var user  = Meteor.user();
	var userlevel = user && user.level;

	if (userlevel && userlevel >= level) {
    	return true
    }

    return false;
});