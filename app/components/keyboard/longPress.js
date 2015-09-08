'use strict';

angular
  .module('flugel.components.longpress', [])
  .directive('fgLongpress', fgLongpressDirective);

  function fgLongpressDirective() {
    return {
      retrict: 'A',
      controller: longpressCtrl,
      scope: {}
    };
  }

  function longpressCtrl($scope, $element, $attrs, $rootScope, $timeout) {

    var timeout = null;
    $scope.message = "Don't press me to hard";
    console.log($scope.message);
    $element.bind('mousedown', function (e) {
        timeout = $timeout(function(){
            $scope.message = "Ouch";
            console.log('long press');
        }, 1000);
    });
    $element.bind('mouseup', function (e) {
        timeout = null;
    });
    // $scope.setNumber = function () {
    //     $scope.keyboard = $scope.keyboardNumber;
    //
    //     if ($scope.keyboard.length >= minNumber && $scope.keyboard.length <= maxNumber) {
    //         $rootScope.$broadcast('submitKeyboard', $scope.keyboard);
    //     }else{
    //         alert('No es un número válido')
    //     }
    // };
  }
