(function () {
    'use strict';

    angular.module('flugel.themes', [])
    .config(['$mdThemingProvider', function($mdThemingProvider) {
      $mdThemingProvider.definePalette('amazingPaletteName', {
        '50': 'ffebee',
        '100': 'ffcdd2',
        '200': 'ef9a9a',
        '300': 'e57373',
        '400': 'fafafa',
        '500': '204C86',
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
      });
      $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('amazingPaletteName');
    }]);
})();
