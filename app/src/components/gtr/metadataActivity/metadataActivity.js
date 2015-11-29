(function () {
'use strict';

angular
  .module('flugel.components.gtr.metadataActivity', [])
  .directive('fgMetadataActivity', fgMetadataActivityDirective);

  function fgMetadataActivityDirective() {
    return {
      retrict: 'E',
      scope: {
          allData : '='
      },
      controller: metadataActivityCtrl,
      templateUrl: 'src/components/gtr/metadataActivity/metadataActivity.html'
    };
  }

  metadataActivityCtrl.$inject = ['$scope', '$element','$attrs', '$interval'];
  function metadataActivityCtrl($scope, $element, $attrs, $interval) {
      // $scope.$apply();
      var customers;
      var advisers;

      $scope.roles = [];
      $scope.activities = [];
      $scope.customersOnHold = [];
      $scope.customersAttended = [];

      $scope.$watch('allData', function () {
          if (!$scope.allData.adviser || !$scope.allData.customer) return;

          customers = $scope.allData.customer;
          advisers = $scope.allData.adviser;
          $scope.roles = getRoles(advisers);
          $scope.activities = getActivity(advisers);

          $scope.customersOnHold = getStateOnHold(customers);
          $scope.customersAttended = getStateAttended(customers);

          $interval(function () {
              $scope.customersOnHold = getStateOnHold(customers);
          }, 1000, false);

      });

      function getRoles(advisers) {
          return _.chain(advisers)
          .map(function (adviser) {return adviser.activity.role;})
          .groupBy(function (rol) {return rol.name;})
          .mapObject(function (val, key) {return {'rol': key, 'code': val[0].code, 'count' : val.length};})
          .values()
          .value();
      }

      function getActivity(advisers) {
          return _.chain(advisers)
          .map(function (adviser) {return adviser.activity.activityEvent;})
          .groupBy(function (activity) {return activity.eventName;})
          .mapObject(function (val, key) {return {'eventName': key, 'eventCode': val[0].eventCode, 'count' : val.length};})
          .values()
          .value();
      }

      function getStateAttended(customers) {
          return _.chain(customers)
          .filter(function (customer) {return customer.token.receiverAdviser;})
          .map(function (customer) {
              var momentIniTime = moment(customer.token.infoToken.logCreationToken);
              return {time: moment.duration(moment().diff(momentIniTime)).asMinutes()};
          })
          .groupBy(function (timeObj) {return timeObj.time <= 15 ? 'puntual' : 'impuntual';})
          .mapObject(function (val, key) {return {'state' : key, 'count' : val.length};})
          .values()
          .value();
      }

      function getStateOnHold(customers) {
          return _.chain(customers)
          .filter(function (customer) {return !customer.token.receiverAdviser;})
          .map(function (customer) {
              var momentIniTime = moment(customer.token.infoToken.logCreationToken);
              return {time: moment.duration(moment().diff(momentIniTime)).asMinutes()};
          })
          .groupBy(function (timeObj) {return timeObj.time <= 15 ? 'puntual' : 'impuntual';})
          .mapObject(function (val, key) {return {'state' : key, 'count' : val.length};})
          .values()
          .value();
      }

  }
})();
