'use strict';

angular
  .module('flugel.components.manageServices', [])
  .directive('fgManageServices', fgManageServicestDirective);

  function fgManageServicestDirective() {
    return {
      scope: {
      },
      controller: servicesCtrl,
      controllerAs: 'demo',
      templateUrl: 'src/components/manageServices/manageServices.html'
    };
  }

  function servicesCtrl($scope) {
      // body...
  }