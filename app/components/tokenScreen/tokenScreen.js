'use strict';

angular
  .module('flugel.components.tokenScreen', [])
  .directive('fgTokenScreen', fgKeyboardDirective);

  function fgKeyboardDirective() {
    return {
      retrict: 'E',
      scope: {},
      controller: tokenScreenCtrl,
      templateUrl: 'components/tokenScreen/tokenScreen.html',
      link: tokenScreenLink
    };
  }

  function tokenScreenCtrl($scope, $element, $attrs) {
  }

  function tokenScreenLink(scope, element, attrs) {
      var w = angular.element(window);
      scope.fontSize = "1.6em";
      if (screen.width <= 600) {
          scope.fontSize = "1em";
      }

      w.bind('resize',function(){
          scope.fontSize = screen.width <= 600 ? "1em" : "1.6em";
          scope.$apply();
      });
  }
