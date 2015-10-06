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

  function loginCardCtrl($scope, $element, $attrs, Login) {
      $scope.user = {name:"", password:""};
      $scope.msj = "";

      $scope.submit = function () {
          //console.log($scope.user);
          Login.login.save($scope.user, function (data) {
             console.log(data); // body...
          }, function (err) {
             if (err.data.invalidPassword) {
                $scope.msj = "Contraseña incorrecta";
             }else if (err.data.nousername) {
                $scope.msj = "Usuario incorrecto";
             }
         });
      };

  }
