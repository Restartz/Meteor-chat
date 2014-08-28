Template.navbar.onlineUserCount = function () {
	return Meteor.users.find({ "status.online": true }).count();
};

Template.navbar.onlineUsers = function () {
	return Meteor.users.find({ "status.online": true }, {sort:{'username':1}});
};