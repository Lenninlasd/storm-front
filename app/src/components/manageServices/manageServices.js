(function () {
'use strict';

angular
  .module('flugel.components.manageServices', [])
  .directive('fgManageServices', fgManageServicestDirective);

  function fgManageServicestDirective() {
    return {
      retrict: 'E',
      scope: {
      },
      controller: servicesCtrl,
      controllerAs: 'demo',
      templateUrl: 'src/components/manageServices/manageServices.html'
    };
  }
  servicesCtrl.$inject = ['$scope', '$element',' $attrs', 'Token', '$mdDialog', 'Config', 'socket'];
  function servicesCtrl($scope, $element, $attrs, Token, $mdDialog, Config, socket) {
      var self = this;
      self.services = [];
      $scope.selectedService = '';

      console.log($attrs);
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
      };

      $scope.insertService = function (serviceData, subService) {
          serviceData.service.subServices = [subService];
          console.log(serviceData.service);
          //socket.emit('insertService', serviceData.service);
      };
  }
})();
