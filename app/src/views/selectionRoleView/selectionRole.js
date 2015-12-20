(function () {
    'use strict';

    angular.module('flugel.views.selectionRole', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/select', {
        templateUrl: 'src/views/selectionRoleView/selectionRole.html',
        controller: 'selectionRoleCtrl'
      });
    }])

    .controller('selectionRoleCtrl', ['$scope', 'Login', '$window', '$cookies', function($scope, Login, $window, $cookies) {
        Login.login.get(function (session) {
            if (!session.login) $window.location = '/login';
        });

        $scope.logout = function(event) {
            event.preventDefault();
            Login.logout.save(function(session) {
                $cookies.remove('session');
                if (!session.login) $window.location = '#/login';
            });
        };

    }]);
})();
