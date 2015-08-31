'use strict';

angular
  .module('flugel.components.keyboard', [])
  .directive('fgKeyboard', fgKeyboardDirective);

  function fgKeyboardDirective() {
    return {
      retrict: 'E',
      controller: keyboardCtrl,
      controllerAs: 'vm',
      templateUrl: 'components/keyboard/keyboard.html'
    };
  }

  function keyboardCtrl($scope, $element, $attrs) {
    var vm = this;
    vm.keyboard = "";
    vm.keyboardNumber = "";

    $scope.addNumber = function (number) {
        vm.keyboardNumber = vm.keyboardNumber + number;
    };
    $scope.setNumber = function () {
        vm.keyboard = vm.keyboardNumber;
        if (typeof $scope[$attrs.onsubmitkb] === 'function') {
            $scope[$attrs.onsubmitkb](vm.keyboard);
        }
    };
    $scope.clearKeyboard = function () {
        vm.keyboard = "";
        vm.keyboardNumber = "";
    };
  }
