'use strict';

angular
  .module('flugel.components.loginCard', [])
  .directive('fgLoginCard', fgLoginCardDirective);

  function fgLoginCardDirective() {
    return {
      retrict: 'E',
      scope: {},
      controller: loginCardCtrl,
      templateUrl: '/login/src/components/loginCard/loginCard.html'
    };
  }

  function loginCardCtrl($scope, $element, $attrs) {
      $scope.user = {name:"", password:""};

      $scope.submit = function () {
          console.log($scope.user);
      }

  }
