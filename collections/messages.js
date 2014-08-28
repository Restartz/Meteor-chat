Messages = new Meteor.Collection('Messages');

Meteor.methods({
	addMessage: function (message) {
		if (message.text.replace(/\s/g, "").length > 0) { //check if not just whitespaces

			if (this.userId) {
		        var user = Meteor.users.findOne(this.userId);

		        message.userId 	 = this.userId;
        		message.username = user.username;
		    }

			message.created = Math.round(new Date().getTime() / 1000); //Unix timestamp in seconds.
			Messages.insert(message);
		}
	},
	removeMessage: function (messageId) {
		var user = Meteor.users.findOne({ _id: this.userId }, {fields: { level:1 }});

		if (user.level >= 5) {
			var message = Messages.findOne({ _id: messageId }, {fields: { userId:1 }});
			var author  = Meteor.users.findOne({ _id: message.userId }, {fields: { level:1 }});
			
			if (user.level >= author.level) {
				Messages.remove(messageId);
				return true;
			}
		}

		throw new Meteor.Error(401, 'You don\'t have enough rights to perform this action.');
	},
	clearAll: function () {
		var user = Meteor.users.findOne({ _id: this.userId }, {fields: { level:1 }});

		if (user.level >= 99) {
			Messages.remove({});
			return true;
		}

		throw new Meteor.Error(401, 'You don\'t have enough rights to perform this action.');
	}
});