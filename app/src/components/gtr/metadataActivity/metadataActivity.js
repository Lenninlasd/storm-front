(function () {
'use strict';

angular
  .module('flugel.components.gtr.metadataActivity', [])
  .directive('fgMetadataActivity', fgMetadataActivityDirective);

  function fgMetadataActivityDirective() {
    return {
      retrict: 'E',
      scope: {
          allData : '='
      },
      controller: metadataActivityCtrl,
      templateUrl: 'src/components/gtr/metadataActivity/metadataActivity.html'
    };
  }

  metadataActivityCtrl.$inject = ['$scope', '$element','$attrs'];
  function metadataActivityCtrl($scope, $element, $attrs) {
      // $scope.$apply();
      var customer;
      var adviser;
      $scope.$watch('allData', function () {
          if (!$scope.allData.adviser || !$scope.allData.customer) return;

          customer = $scope.allData.customer;
          adviser = $scope.allData.adviser;
          console.log(adviser);
      });

  }
})();
