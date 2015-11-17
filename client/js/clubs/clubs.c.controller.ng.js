angular.module('clubs').controller('ClubsListController', ClubsListController);
angular.module('clubs').controller('ClubsDetailedController', ClubsDetailedController);

// ------------------------------------------------------------------------------ LIST
/* @ngInject */
function ClubsListController($scope, $meteor) {
  var vm = this;
  vm.list = $meteor.collection(Clubs).subscribe('parties');
}

// ------------------------------------------------------------------------------ DETAILED
/* @ngInject */
function ClubsDetailedController($scope, $meteor, $stateParams) {
  var vm = this;
  vm.item = $meteor.object(Clubs, $stateParams.clubId, false); // false to disable autosave

  vm.actions = {
    save() {
      vm.item.save().then((fields)=>{
        console.log('saved: '+ fields + 'fields !');
      }, (err)=>{
        console.log(err);
      });
    },
    reset() {
      vm.item.reset();
    }
  };
}
