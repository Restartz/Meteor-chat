
// Accounts.config({
// 	sendVerificationEmail: true
// });

Accounts.onCreateUser(function (options, user) {
	
	user.level = (user.username === 'admin') ? 100 : 1; //default admin account gets level 100.
	user.isBanned = false;

	return user;
});

Accounts.validateLoginAttempt(function(info) {
    // var user = info.user;

    // if (user.isBanned) 
    // 	throw new Meteor.Error(403, 'You are banned');

    return true;
});

Meteor.startup(function () {
	// Create admin account on startup.
	if (Meteor.users.find().count() === 0) {
	    adminId = Accounts.createUser({
	        username: 'admin',
	        email: 'admin@domain.com',
	        password: 'P@ssw0rd'
	    });
	}
});
