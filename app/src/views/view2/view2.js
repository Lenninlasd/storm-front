'use strict';

angular.module('flugel.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'src/views/view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', 'Login', '$window', '$cookies', function($scope, Login, $window, $cookies) {
    Login.login.get(function (session) {
        if (!session.login) $window.location = '/login';
    });
    $scope.logout = function(event) {
        event.preventDefault();
        Login.logout.save(function(session) {
            $cookies.remove('session');
            if (!session.login) $window.location = '/login';
        });
    };
}]);
