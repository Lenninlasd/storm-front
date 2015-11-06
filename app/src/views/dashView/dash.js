(function () {
'use strict';

  angular.module('flugel.views.dash', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dash', {
      templateUrl: 'src/views/dashView/dash.html',
      controller: 'dashCtrl'
    });
  }])

  .controller('dashCtrl', ['$scope', 'Login', '$window', '$cookies', '$mdSidenav', function($scope, Login, $window, $cookies, $mdSidenav) {
      // Login.login.get(function (session) {
      //     if (!session.login) $window.location = '/login';
      // });
  }]);

})();
