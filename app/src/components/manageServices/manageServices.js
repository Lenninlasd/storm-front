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
      $scope.selectedService = '';

      Token.services.query(function (data) {
          self.services = data;
          console.log(data);
      });

      $scope.cancel = function() {
           $mdDialog.cancel();
       };

      $scope.choosePurposeVisit = function(ev, serviceData){
          console.log(serviceData);
          $scope.selectedService = serviceData._id;
      };

      $scope.goBackStep = function () {
          $scope.selectedService = '';
          $scope.searchText = '';
      }
  }
