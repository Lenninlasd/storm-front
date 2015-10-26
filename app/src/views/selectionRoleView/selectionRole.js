'use strict';

angular.module('flugel.views.selectionRole', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/select', {
    templateUrl: 'src/views/selectionRoleView/selectionRole.html',
    controller: 'selectionRoleCtrl'
  });
}])

.controller('selectionRoleCtrl', ['$scope', 'Login', '$window', function($scope, Login, $window) {
    Login.login.get(function (session) {
        if (!session.login) $window.location = '/login';
    });

}]);
