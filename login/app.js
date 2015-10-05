'use strict';

angular.module('flugel', [
  'ngRoute',
  'ngMaterial',
  'flugel.loginview',
  'flugel.components'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
