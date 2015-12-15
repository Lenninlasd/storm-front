(function () {
'use strict';

angular
  .module('flugel.components.sidenav', [])
  .directive('fgSidenav', fgSidenavDirective);

  function fgSidenavDirective() {
    return {
      retrict: 'E',
      scope: {
      },
      controller: sideNavCtrl,
      templateUrl: 'src/components/sidenav/sidenav.html'
    };
  }

  sideNavCtrl.$inject = ['$scope', '$element','$attrs', 'BranchOffice', '$location'];
  function sideNavCtrl($scope, $element, $attrs, BranchOffice, $location) {
      $scope.branchOfficeList = [];
      $scope.currentBranchOffice = $location.path().split('/')[2];
      
      BranchOffice.branchOfficeList.query(data => {
          $scope.branchOffices = data;
      }, err => {
          console.log(err);
      });
  }
})();
