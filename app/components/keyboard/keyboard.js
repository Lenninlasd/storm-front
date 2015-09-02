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
    // Máximo numero de degitos aceptados (deberia cambiarse por una ReGex)
    var maxNumber = 10;
    var minNumber = 4;

    var vm = this;
    vm.keyboard = "";
    vm.keyboardNumber = "";

    $scope.addNumber = function (number) {
        vm.keyboardNumber = vm.keyboardNumber + number;
    };
    $scope.setNumber = function () {
        vm.keyboard = vm.keyboardNumber;

        if (vm.keyboard.length >= minNumber && vm.keyboard.length <= maxNumber) {
            if (typeof $scope[$attrs.onsubmitkb] === 'function') {
                $scope[$attrs.onsubmitkb](vm.keyboard);
            }
        }else{
            alert('No es un número válido')
        }

    };
    $scope.clearKeyboard = function () {
        vm.keyboard = "";
        vm.keyboardNumber = "";
    };
  }
