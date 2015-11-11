(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('flugel', [
      'ngRoute',
      'ngMaterial',
      'ngCookies',
      'flugel.themes',
      'flugel.services',
      'flugel.views',
      'flugel.components',
    ]).
    config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/'});
    }])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push(['$cookies', '$location', '$q', function ($cookies, $location, $q) {
            return {
              request : function (config) {
                  if ($cookies.get('session')) {
                      config.headers.authorization = $cookies.get('session');
                  }
                  return config;
              },
            };
        }]);
    }]);
})();
