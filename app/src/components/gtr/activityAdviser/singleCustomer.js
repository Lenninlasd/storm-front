(function () {
'use strict';

angular
  .module('flugel.components.gtr.singleCustomer', [])
  .directive('fgFreeCustomer', fgFreeCustomerDirective);

  function fgFreeCustomerDirective() {
    return {
      retrict: 'E',
      scope: {
          adviserActivity : '='
      },
      controller: activityCustomerCtrl,
      templateUrl: 'src/components/gtr/activityAdviser/singleCustomer.html'
    };
  }

  activityCustomerCtrl.$inject = ['$scope', '$element','$attrs', '$interval'];
  function activityCustomerCtrl($scope, $element, $attrs, $interval) {
      var stopTime;
      $scope.waitTime = "00:00:00";

      stopTime = $interval(function () {
          $scope.waitTime = diffTime($scope.adviserActivity.token.infoToken.logCreationToken, false);
      }, 500, false);

      function diffTime(iniTime, endTime) {
          var momentIniTime = iniTime ? moment(iniTime): moment();
          var momentEndTime = endTime ? moment(endTime) : moment();
          return moment.utc(momentEndTime.diff(momentIniTime)).format("HH:mm:ss");
      }
  }
})();
