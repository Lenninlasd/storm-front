'use strict';

// Declare app level module which depends on views, and components
angular.module('flugel', [
  'ngRoute',
  'ngMaterial',
  'flugel.view1',
  'flugel.view2',
  'flugel.version',
  'flugel.components'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
