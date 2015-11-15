Meteor.startup(function () {
    if (Clubs.find().count() === 0) {
      var clubs = [
        {
          'name': 'Test Club 1',
          'description': 'Fast just got faster with Nexus S.',
          'members': [],
          'goals': []
        },
      ];
      for (var i = 0; i < clubs.length; i++)
        Clubs.insert(clubs[i]);
    }
  });
