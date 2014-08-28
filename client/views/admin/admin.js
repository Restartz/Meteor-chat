

Template.admin.helpers({
	userlist: function() {
  		return Meteor.users.find({}, {sort:{'username':1}});
	},
	checkIsBanned: function () {
		return (this.isBanned) ? "checked" : null;
	}
});

Template.admin.events({
	'change .levelRange': function (e) {
    	var level = $(e.target).val();

		Meteor.call('setUserLevel', this._id, level, function (error, result) {
			if (error) Alerts.add(error.reason, 'danger');
		});
	},
	'click .isBanned': function (e) {
		var toggle = $(e.target).prop('checked');
    	var ban    = (toggle) ? true : false;

		Meteor.call('banUser', this._id, ban, function (error, result) {
			if (error) Alerts.add(error.reason, 'danger');
		});
	},
	'click .kick': function () {
		Meteor.call('kickUser', this._id, function (error, result) {
			if (error) Alerts.add(error.reason, 'danger');
		});
	},
	'click .clearAll': function () {
		Meteor.call('clearAll', function (error, result) {
			if (error) Alerts.add(error.reason, 'danger');
			console.log(result);
			if (result) Alerts.add('All messages have been deleted.', 'danger');
		});
	}
});