angular.module('user.sign')
  .controller('SignController', SignController);


function SignController($scope, $rootScope, $meteor, $state, $meteorUtils, $timeout) {
  var vm = this;

  vm.credentials = {
    email: '',
    oldPassword: '',
    password: '',
    profile: {
      name: '',
      gender: 1,
      locale: ''
    }
  };

  vm.verify = {
    token: $state.params.token
  };

  vm.restore = {
    token: $state.params.token,
    state: 0,
    newPassword: ''
  };

  vm.error = '';

  vm.actions = {
    signIn() {
        $meteor.loginWithPassword(vm.credentials.email, vm.credentials.password).then(
          function() {
            vm.error = '';
            $state.go('index');
          },
          function(err) {
            vm.error = 'Login error - ' + err;
          }
        );
      },

      signUp() {
        $meteor.createUser(vm.credentials).then(
          function() {
            vm.error = '';
            $state.go('index');
          },
          function(err) {
            vm.error = 'Registration error - ' + err;
          }
        );
      },
      verifyEmail() {
        $meteor.verifyEmail(vm.verify.token).then(
          function() {
            vm.error = '';
            vm.verify.status = 1;
          },
          function(err) {
            vm.error = 'Error sending forgot password email - ' + err;
          }
        );
      },

      forgotPassword() {
        $meteor.forgotPassword({
          email: vm.credentials.email
        }).then(
          function() {
            vm.error = '';
            vm.restore.state = 1;
          },
          function(err) {
            vm.error = 'Error sending forgot password email - ' + err;
          }
        );
      },

      restorePassword() {
        if (vm.restore.newPassword.length < 6) {
          vm.error = 'password-too-small';
          return false;
        }

        $meteor.resetPassword(vm.restore.token, vm.restore.newPassword).then(
          function() {
            vm.error = '';
            vm.restore.state = 1;
            $timeout(() => {
              $state.go('index');
            }, 5000);
          },
          function(err) {
            vm.restore.state = -1;
            vm.error = 'Error  reset password - ' + err;
          }
        );
      },

      changePassword() {
        $meteor.changePassword(vm.credentials.oldPassword, vm.credentials.password).then(function() {
          console.log('Change password success');
        }, function(err) {
          console.log('Error changing password - ', err);
        });
      }
  };

  // логин с помощью соц.сетей, создает пользователя, либо добавляет сервис в существующего
  vm.external = {
    fb() {
        let $signInWithFacebook = $meteorUtils.promissor(Meteor, 'signInWithFacebook');
        $signInWithFacebook({
          requestPermissions: ['email', 'public_profile'],
          loginStyle: 'popup'
        }, (error, mergedUserId) => {
          if (mergedUserId) {
            console.log(mergedUserId, 'merged with', Meteor.userId());
          }
        });
      },
      vk() {
        let $signInWithVk = $meteorUtils.promissor(Meteor, 'signInWithVk');
        $signInWithVk({
          requestPermissions: ['email', 'status', 'pages'],
          loginStyle: 'popup'
        }, (error, mergedUserId) => {
          if (mergedUserId) {
            console.log(mergedUserId, 'merged with', Meteor.userId());
          }
        });
      },
      instagram() {
        let $signInWithInstagram = $meteorUtils.promissor(Meteor, 'signInWithInstagram');
        $signInWithInstagram({}, (error, mergedUserId) => {
          if (mergedUserId) {
            console.log(mergedUserId, 'merged with', Meteor.userId());
          }
        });
      }
  };

  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      // event.preventDefault();
      vm.error = '';
    });

}
