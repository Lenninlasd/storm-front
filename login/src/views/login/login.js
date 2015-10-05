'use strict';

angular.module('flugel.loginview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/login/src/views/login/login.html',
    controllerAs: 'demo',
    controller: 'LoginCtrl'
  });
}])
.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope'];
function LoginCtrl($scope) {
  // body...
}
