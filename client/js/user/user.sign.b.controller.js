angular.module('user.sign')
  .controller('SignController', SignController);


function SignController($scope, $meteor, $state, $meteorUtils) {
  var vm = this;

  vm.credentials = {
    email: '',
    oldPassword: '',
    password: '',
    profile: {
      name: '',
      gender: '',
      locale: ''
    }
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

      resetPassword() {
        $meteor.forgotPassword({
          email: vm.credentials.email
        }).then(
          function() {
            vm.error = '';
            $state.go('user.signin');
          },
          function(err) {
            vm.error = 'Error sending forgot password email - ' + err;
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

  vm.external = {
    fb() {
        $meteor.loginWithFacebook({
          requestPermissions: ['email', 'public_profile'],
          loginStyle: 'popup'
        }).then(function() {
          console.log('Login success');
        }, function(err) {
          console.log('Login error - ', err);
        });
      },
      vk() {
        let $loginWithVk = $meteorUtils.promissor(Meteor, 'loginWithVk');
        $loginWithVk({
          requestPermissions: ['email', 'status', 'pages'],
          loginStyle: 'popup'
        }).then(function() {
          console.log('Login success');
        }, function(err) {
          console.log('Login error - ', err);
        });
      },
      instagram() {
        let $loginWithInstagram = $meteorUtils.promissor(Meteor, 'loginWithInstagram');
        $loginWithInstagram(function(err, res) {
          if (err !== undefined)
            console.log('Login success');
          else
            console.log('login error - ' + err);
        });
      }
  };
}
