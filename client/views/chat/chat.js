
// Fetch all messages in descending order.
Template.messagelist.messages = function () {
  return Messages.find({}, {sort: {created: -1}});
};

Template.chat.events({
  'click .showSignIn': function (e) {
    e.stopPropagation(); 
    if ($('.navbar-toggle:visible').hasClass('collapsed')) {
      $('.navbar-toggle:visible').trigger( "click" );
    }
    $('.dropdown-toggle').dropdown('toggle');
  }
});

Template.inputform.events({
  'click .send, keyup .inputmessage': function (e) {

    if ((e.type === 'click') || (e.type === 'keyup' && e.which === 13) ) {
      //console.log(Meteor.user());
      var user = Meteor.user();

      // message object
      var message = {
        text: $('.inputmessage').val() 
      }

      // send message to server to insert.
      Meteor.call('addMessage', message, function (error, result) {});

      // clear inputmessage
      $('.inputmessage').val('');
    }
  }
});

Template.message.events({
  'click .removeMessage': function (e) {
    var messageId = $(e.target).val();
    Meteor.call('removeMessage', messageId, function (error, result) {});
  }
});