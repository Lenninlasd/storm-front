(function () {
'use strict';

angular
  .module('flugel.components.gtr.header', [])
  .directive('fgHeader', fgHeaderDirective);

  function fgHeaderDirective() {
    return {
      retrict: 'E',
      scope: {
      },
      controller: headerCtrl,
      templateUrl: 'src/components/gtr/header/header.html'
    };
  }

  headerCtrl.$inject = ['$scope', '$element','$attrs'];
  function headerCtrl($scope, $element, $attrs) {

  }
})();
