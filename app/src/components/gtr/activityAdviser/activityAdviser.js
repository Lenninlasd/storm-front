(function () {
'use strict';

angular
  .module('flugel.components.gtr.activityAdviser', [])
  .directive('fgActivityAdviser', fgActivityAdviserDirective);

  function fgActivityAdviserDirective() {
    return {
      retrict: 'E',
      scope: {
      },
      controller: activityAdviserCtrl,
      templateUrl: 'src/components/gtr/activityAdviser/activityAdviser.html'
    };
  }

  activityAdviserCtrl.$inject = ['$scope', '$element','$attrs'];
  function activityAdviserCtrl($scope, $element, $attrs) {

  }
})();
