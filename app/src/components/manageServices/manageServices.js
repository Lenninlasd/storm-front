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

  function servicesCtrl($scope, Token, $mdDialog) {
      var self = this;
      self.services = [];

      Token.services.query(function (data) {
          self.services = data;
          console.log(data);
      });

      $scope.cancel = function() {
           $mdDialog.cancel();
       };
  }
