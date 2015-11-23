(function () {
'use strict';

angular
  .module('flugel.components.gtr.singleAdviser', [])
  .directive('fgFreeAdviser', fgFreeAdviserDirective);

  function fgFreeAdviserDirective() {
    return {
      retrict: 'E',
      scope: {
          adviserActivity : '='
      },
      controller: activityAdviserCtrl,
      templateUrl: 'src/components/gtr/activityAdviser/singleAdviser.html'
    };
  }

  activityAdviserCtrl.$inject = ['$scope', '$element','$attrs', '$interval'];
  function activityAdviserCtrl($scope, $element, $attrs, $interval) {
      var stopTime;
      $scope.activityTime = "00:00:00";

      stopTime = $interval(function () {
          $scope.activityTime = diffTime($scope.adviserActivity.activity.activityStartTime, false);
      }, 500, false);

      function diffTime(iniTime, endTime) {
          var momentIniTime = iniTime ? moment(iniTime): moment();
          var momentEndTime = endTime ? moment(endTime) : moment();
          return moment.utc(momentEndTime.diff(momentIniTime)).format("HH:mm:ss");
      }
  }
})();
