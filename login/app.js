'use strict';

angular.module('flugel', [
  'ngRoute',
  'ngMaterial',
  'flugel.loginview'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
