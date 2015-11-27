(function () {
'use strict';

angular
  .module('flugel.components.gtr.metadataActivity', [])
  .directive('fgMetadataActivity', fgMetadataActivityDirective);

  function fgMetadataActivityDirective() {
    return {
      retrict: 'E',
      scope: {
      },
      controller: metadataActivityCtrl,
      templateUrl: 'src/components/gtr/metadataActivity/metadataActivity.html'
    };
  }

  metadataActivityCtrl.$inject = ['$scope', '$element','$attrs'];
  function metadataActivityCtrl($scope, $element, $attrs) {

  }
})();
