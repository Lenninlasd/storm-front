(function () {
'use strict';

angular
  .module('flugel.components.gtr.activityAdviser', [])
  .directive('fgActivityAdviser', fgActivityAdviserDirective);

  function fgActivityAdviserDirective() {
    return {
      retrict: 'E',
      scope: {
          adviserActivity : '='
      },
      controller: activityAdviserCtrl,
      templateUrl: 'src/components/gtr/activityAdviser/activityAdviser.html'
    };
  }

  activityAdviserCtrl.$inject = ['$scope', '$element','$attrs', 'Activity', '$routeParams', '$interval'];
  function activityAdviserCtrl($scope, $element, $attrs, Activity, $routeParams, $interval) {
      var stopTime;
      $scope.attentionTime = "00:00:00";
      $scope.waitTime = "00:00:00";
      $scope.callTime = "00:00:00";
      $scope.availableTime = "00:00:00";
      console.log($scope.adviserActivity.customer);
      //** validar si existe **
      if ($scope.adviserActivity.customer) {
        $scope.waitTime = diffTime($scope.adviserActivity.customer.token.infoToken.logCreationToken,
                          $scope.adviserActivity.customer.token.infoToken.logCalledToken);

        $scope.callTime = diffTime($scope.adviserActivity.customer.token.infoToken.logCalledToken,
                          $scope.adviserActivity.customer.token.infoToken.logAtentionToken);

        stopTime = $interval(function () {
            $scope.attentionTime = diffTime($scope.adviserActivity.customer.token.infoToken.logAtentionToken, false);
        }, 500, false);
      }


      function diffTime(iniTime, endTime) {
          var momentIniTime = iniTime ? moment(iniTime): moment();
          var momentEndTime = endTime ? moment(endTime) : moment();
          return moment.utc(momentEndTime.diff(momentIniTime)).format("HH:mm:ss");
      }
  }
})();
