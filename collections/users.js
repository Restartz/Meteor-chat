
Meteor.methods({
	setUserLevel: function (targetId, level) 
	{
		if (this.userId === targetId)
			throw new Meteor.Error(406, 'You can\'t perform this action on yourself.');

		var user = Meteor.users.findOne({ _id: this.userId }, {fields: { level:1 }});
		if (user.level >= 90 && level <= user.level) {
			var target = Meteor.users.findOne({ _id: targetId }, {fields: { level:1 }});
			
			if (user.level >= target.level) {
				Meteor.users.update({_id: targetId}, {$set: { "level" : level }});
				return true;
			}
		}

		throw new Meteor.Error(401, 'You don\'t have enough rights to perform this action.');
	},
	kickUser: function (targetId) 
	{
		if (this.userId === targetId)
			throw new Meteor.Error(406, 'You can\'t perform this action on yourself.');

		var user = Meteor.users.findOne({ _id: this.userId }, {fields: { level:1 }});
		if (user.level >= 5) {
			var target = Meteor.users.findOne({ _id: targetId }, {fields: { level:1 }});

			if (user.level >= target.level) {
				Meteor.users.update({_id: targetId}, {$set: { "services.resume.loginTokens" : [] }});
				return true;
			}
		}

		throw new Meteor.Error(401, 'You don\'t have enough rights to perform this action.');
	},
	banUser: function (targetId, value) 
	{
		if (this.userId === targetId)
			throw new Meteor.Error(406, 'You can\'t perform this action on yourself.');

		var user = Meteor.users.findOne({ _id: this.userId }, {fields: { level:1 }});
		if (user.level >= 90) {
			var target = Meteor.users.findOne({ _id: targetId }, {fields: { level:1 }});
			
			if (user.level > target.level) {
				Meteor.users.update({_id: targetId}, {$set: { "isBanned" : value }});
			}
		}

		throw new Meteor.Error(401, 'You don\'t have enough rights to perform this action.');
	}
});