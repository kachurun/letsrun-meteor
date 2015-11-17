Meteor.startup(function() {
  // 1. Set up stmp
  //   your_server would be something like 'smtp.gmail.com'
  //   and your_port would be a number like 25

  process.env.MAIL_URL = 'smtp://' +
    encodeURIComponent('kachurun') + ':' +
    encodeURIComponent('ROOT230105081ls-la/') + '@' +
    encodeURIComponent('smtp.gmail.com') + ':' + 465;

  // 2. Format the email

  Accounts.emailTemplates.siteName = "LetsRun";
  Accounts.emailTemplates.from = "LetsRun.ru <noreply@letsrun.ru>";

  // register
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return user.profile.name + ', Добро пожаловать на #LetsRun!';
  };
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    var token = url.substring(url.lastIndexOf('/') + 1);
    url = Meteor.absoluteUrl('user/verify/' + token);

    return [
      "Привет! \n\n",
      "Мы рады, что вы присоединились к движению #LetsRun! \n\n",
      "Ваш аккаунт на сайте www.letsrun.ru был успешно создан. \n\n",
      "Для подтверждения учетной записи перейдите по ссылке: " + url + "\n\n",
      "Вы можете авторизовываться через свою учетную запись Facebook и Vkontakte \n\n",
      "Заходите на www.letsrun.ru и начните бегать! \n\n",
      "P.S. Если вы получили это сообщение по ошибке, просто удалите его.\n\n"
    ].join('');
  };

  // password resetPassword
  Accounts.emailTemplates.resetPassword.subject = function(user) {
    return "#LetsRun: Изменение пароля пользователя " + user.profile.name;
  };
  Accounts.emailTemplates.resetPassword.text = function(user, url) {
    var token = url.substring(url.lastIndexOf('/') + 1);
    url = Meteor.absoluteUrl('user/restore/' + token);

    return [
      "Привет! \n\n",
      "Кто то запросил изменение вашего пароля на сайте #LetsRun! \n\n",
      "Для изменения пароля перейдите по ссылке: " + url + "\n\n",
      "P.S. Если вы получили это сообщение по ошибке, просто удалите его.\n\n"
    ].join('');
  };

  // 3.  Send email when account is created
  Accounts.config({
    sendVerificationEmail: true,
    loginExpirationInDays: 7
  });
});
