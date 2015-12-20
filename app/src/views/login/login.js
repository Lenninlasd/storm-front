'use strict';

angular.module('flugel.views.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'src/views/login/login.html',
    controllerAs: 'demo',
    controller: 'LoginCtrl'
  });
}])
.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope'];
function LoginCtrl($scope) {
  // body...
}
