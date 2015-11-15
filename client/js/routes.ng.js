angular.module('letsrun')
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
    // enable HTML5 history api mode
    $locationProvider.html5Mode(true);
    //disable strict mode https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-make-a-trailing-slash-optional-for-all-routes
    $urlMatcherFactoryProvider.strictMode(false);
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
      .state('index', {
        url: "/",
        templateUrl: "client/partials/main.html"
      })

    // LOGIN PAGE
    .state('user', {
        url: "/user",
        abstract: true,
        template: '<ui-view/>',
        controller: 'SignController as sign'
      })
      .state('user.signin', {
        url: "/signin",
        templateUrl: "client/partials/user/user.signin.html",
      })
      .state('user.signup', {
        url: "/signup",
        templateUrl: "client/partials/user/user.signup.html",
      })
      .state('user.forgot', {
        url: "/forgot",
        templateUrl: "client/partials/user/user.forgot.html",
      })
      .state('user.signout', {
        url: "/signout",
        resolve: {
          "signout": function($meteor, $state) {
            return $meteor.logout().then(function() {
              $state.go('user.signin');
            }, function(err) {
              console.log('logout error - ', err);
            });
          }
        }
      })

    // CLUBS
    .state('clubs', {
        url: "/clubs",
        abstract: true,
        templateUrl: "client/partials/clubs/clubs.html"
      })
      .state('clubs.list', {
        url: "",
        templateUrl: "client/partials/clubs/clubs.list.html",
        controller: 'ClubsListController as clubs'
      })
      .state('clubs.detailed', {
        url: "/:clubId",
        templateUrl: "client/partials/clubs/clubs.detailed.html",
        controller: 'ClubsDetailedController as club'
      });
  });
