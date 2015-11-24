(function () {
'use strict';

  angular.module('flugel.views.dash', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dash', {
      templateUrl: 'src/views/dashView/dash.html',
      controller: 'dashCtrl'
    }).when('/dash/:circleId', {
      templateUrl: 'src/views/dashView/dash.html',
      controller: 'dashCtrl'
    });
  }])

  .controller('dashCtrl', ['$scope', 'Login', '$window', '$cookies', '$mdSidenav', '$routeParams', 'Activity',
        function($scope, Login, $window, $cookies, $mdSidenav, $routeParams, Activity) {
      // Login.login.get(function (session) {
      //     if (!session.login) $window.location = '/login';
      // });

      $scope.close = function () {
          $mdSidenav('left').toggle()
          .then(function () {
            console.log("close RIGHT is done");
          });
      };
  }]);

})();
