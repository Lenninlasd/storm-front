'use strict';

angular
  .module('flugel.components.tokenScreen', [])
  .directive('fgTokenScreen', fgKeyboardDirective);

  function fgKeyboardDirective() {
    return {
      retrict: 'E',
      scope: {},
      controller: tokenScreenCtrl,
      templateUrl: 'components/tokenScreen/tokenScreen.html'
    };
  }

  function tokenScreenCtrl($scope, $element, $attrs) {
  }
