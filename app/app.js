'use strict';

// Declare app level module which depends on views, and components
angular.module('flugel', [
  'ngRoute',
  'ngMaterial',
  'ngCookies',
  'flugel.services',
  'flugel.views',
  'flugel.version',
  'flugel.components',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.config(function($mdThemingProvider) {
  $mdThemingProvider.definePalette('amazingPaletteName', {
    '50': 'ffebee',
    '100': 'ffcdd2',
    '200': 'ef9a9a',
    '300': 'e57373',
    '400': 'fafafa',
    '500': 'fafafa',
    '600': 'e53935',
    '700': 'd32f2f',
    '800': 'c62828',
    '900': 'b71c1c',
    'A100': 'ff8a80',
    'A200': 'ff5252',
    'A400': 'ff1744',
    'A700': 'd50000',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });
  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('amazingPaletteName').dark();
})
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
