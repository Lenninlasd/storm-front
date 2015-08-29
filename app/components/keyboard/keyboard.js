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
  }

  function keyboardCtrl($scope, $element, $attrs) {
    $scope.keyboard = "";
    $scope.keyboardNumber = "";

    $scope.addNumber = function (number) {
        $scope.keyboardNumber = $scope.keyboardNumber + number;
    };
    $scope.setNumber = function () {
        $scope.keyboard = $scope.keyboardNumber;
    };
    $scope.clearKeyboard = function () {
        $scope.keyboard = "";
        $scope.keyboardNumber = "";
    };
  }
