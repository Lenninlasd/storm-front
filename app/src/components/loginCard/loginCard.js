'use strict';

angular
  .module('flugel.components.loginCard', [])
  .directive('fgLoginCard', fgLoginCardDirective);

  function fgLoginCardDirective() {
    return {
      retrict: 'E',
      scope: {},
      controller: loginCardCtrl,
      templateUrl: 'src/components/loginCard/loginCard.html'
    };
  }

  loginCardCtrl.$inject = ['$scope', '$element', '$attrs', '$window', '$cookies', 'Login'];
  function loginCardCtrl($scope, $element, $attrs, $window, $cookies, Login) {
      $scope.user = {name:"", password:""};
      $scope.msj = "";

      Login.login.get(function (session) {
          if (session.login) {
            $window.location = $attrs.redirectto;
          }else if ($cookies.get('session')) {
              $cookies.remove('session', {path: '/'});
          }
      });

      $scope.submit = function () {
          Login.login.save($scope.user, function (data) {
             $cookies.put('session', data.idSession, {path: '/'});
             $window.location = $attrs.redirectto;
          }, function (err) {
             if (err.data.invalidPassword) {
                $scope.msj = "Contraseña incorrecta";
             }else if (err.data.nousername) {
                $scope.msj = "Usuario incorrecto";
             }
         });
      };

  }
