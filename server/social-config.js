switch (process.env.ROOT_URL) {
  case "http://letsrun.meteor.com/":
    //facebook
    ServiceConfiguration.configurations.remove({
      service: 'facebook'
    });

    ServiceConfiguration.configurations.insert({
      service: 'facebook',
      appId: '1533828096909113',
      secret: '58ff9958947af6361ebebff188bf3154'
    });

    // vk
    ServiceConfiguration.configurations.remove({
      service: 'vk'
    });

    ServiceConfiguration.configurations.insert({
      service: 'vk',
      appId: '5151032', // Your app id
      secret: 'V8IvfVqO1mxz7ldBS3TV' // Your app secret
    });

    // instagram
    ServiceConfiguration.configurations.remove({
      service: "instagram"
    });
    ServiceConfiguration.configurations.insert({
      service: "instagram",
      clientId: "4d8692022c8f489da1c211539dd57d19",
      scope: 'basic',
      secret: "84f92b8610194e35b87b3e5239460e56"
    });
    break;
  case "http://localhost:3000/":
    //facebook
    ServiceConfiguration.configurations.remove({
      service: 'facebook'
    });

    ServiceConfiguration.configurations.insert({
      service: 'facebook',
      appId: '1533324816959441',
      secret: 'a77a2504555de2a3350876355944566c'
    });

    // vk
    ServiceConfiguration.configurations.remove({
      service: 'vk'
    });

    ServiceConfiguration.configurations.insert({
      service: 'vk',
      appId: '5148447', // Your app id
      secret: 'oAccMdJgpaJW1iFhUqOw' // Your app secret
    });

    // instagram
    ServiceConfiguration.configurations.remove({
      service: "instagram"
    });
    ServiceConfiguration.configurations.insert({
      service: "instagram",
      clientId: "4d8692022c8f489da1c211539dd57d19",
      scope: 'basic',
      secret: "84f92b8610194e35b87b3e5239460e56"
    });
    break;
}

// создание пользователя
Accounts.onCreateUser(function(options, user) {
  if (!options || !user) {
    console.log('error creating user');
    return;
  } else {
    // -------------------------------------------------------------------------  заполняем профиль введенными данными при регистрации по паролю
    if (options.profile) {
      user.profile = user.profile || options.profile;
    }
    // ------------------------------------------------------------------------- заполняем профиль после регистрации через соц.сети
    if (user.services.facebook) {
      user.profile.name = user.profile.name || user.services.facebook.name;
      user.profile.gender = user.profile.gender || user.services.facebook.gender === 'male' ? 2 : 1;
      user.profile.email = user.profile.email || user.services.facebook.email;
    } else if (user.services.vk) {
      user.profile.name = user.profile.name || user.services.vk.first_name + ' ' + user.services.vk.last_name;
      user.profile.gender = user.profile.gender || user.services.vk.sex;
      user.profile.email = user.profile.email || user.services.vk.email;
    } else if (user.services.instagram) {
      user.profile.name = user.profile.name || user.services.instagram.full_name;
      user.profile.email = user.profile.email || '';
    }
    // -------------------------------------------------------------------------  при регистрации через соц.сеть создаем учетку с паролем
    if (!user.services.password && user.profile.email) {
      // npm-bcrypt required
      var bcrypt = NpmModuleBcrypt;
      var bcryptHash = Meteor.wrapAsync(bcrypt.hash);
      // генерим пароль
      var password = Random.id(8);
      // хэш
      var digest = Package.sha.SHA256(password);
      // добавляем емейл в список мейлов
      if (Accounts.findUserByEmail(user.profile.email) === undefined) {
        user.emails = [{
          'address': user.profile.email,
          'verified': true
        }];
      }
      // прописываем пассворд аутх с bcrypt паролем
      user.services.password = {
        bcrypt: bcryptHash(digest, Accounts._bcryptRounds)
      };

    }
  }
  return user;
});

// мержит профили соц.сетей
AccountsMerge.onMerge = function(winner, loser) {
  // Update application specific collections, eg.
  // Items.update (
  //   {"owner": loser._id},
  //   {$set: {"owner": winner._id}},
  //   {"multi": true}
  // );

  // If you use something like accounts-guest, you can handle the guest
  // users here. Eg. when a user with a (one or more) login service(s)
  // is merged with a guest, then the guest is not a guest anymore!
  // Meteor.users.update (
  //   winner._id,
  //   {$unset: {"profile.guest": ""}}
  // );

  // Remove the merged (losing) user from the DB
  Meteor.users.remove(loser._id);
};
