Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Meteor.publish("clubs", function () {
  return Clubs.find({
    $or:[
      {$and:[
        {"public": true},
        {"public": {$exists: true}}
      ]},
      {$and:[
        {owner: this.userId},
        {owner: {$exists: true}}
      ]}
    ]});
});
