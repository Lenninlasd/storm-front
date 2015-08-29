'use strict';

angular
  .module('flugel.components.keyboard', [])
  .directive('fgKeyboard', fgKeyboardDirective);

  function fgKeyboardDirective() {
    return {
      retrict: 'E',
      controller: keyboardCtrl,
      templateUrl: 'components/keyboard/keyboard.html'
    };
    function keyboardCtrl($scope, $element, $attrs) {
      // body...
    }
  }
