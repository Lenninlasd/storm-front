'use strict';

angular
  .module('flugel.components.tokenScreen', [])
  .directive('fgTokenScreen', fgKeyboardDirective);

  function fgKeyboardDirective() {
    return {
      retrict: 'E',
      scope: {},
      controller: tokenScreenCtrl,
      templateUrl: 'src/components/tokenScreen/tokenScreen.html',
      link: tokenScreenLink
    };
  }

  function tokenScreenCtrl($scope, $element, $attrs) {
  }

  function tokenScreenLink(scope, element, attrs) {
  }
