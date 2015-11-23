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

  sideNavCtrl.$inject = ['$scope', '$element','$attrs', 'BranchOffice'];
  function sideNavCtrl($scope, $element, $attrs, BranchOffice) {
      $scope.branchOfficeList = [];
      BranchOffice.branchOfficeList.query(function (data) {
          $scope.branchOffices = data;
      }, function (err) {
          console.log(err);
      });
  }
})();
