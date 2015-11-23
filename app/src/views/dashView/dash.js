(function () {
'use strict';

  angular.module('flugel.views.dash', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dash', {
      templateUrl: 'src/views/dashView/dash.html',
      controller: 'dashCtrl'
    }).when('/dash/:circleId', {
      templateUrl: 'src/views/dashView/dash.html',
      controller: 'dashCtrl'
    });
  }])

  .controller('dashCtrl', ['$scope', 'Login', '$window', '$cookies', '$mdSidenav', '$routeParams', 'Activity',
        function($scope, Login, $window, $cookies, $mdSidenav, $routeParams, Activity) {
      // Login.login.get(function (session) {
      //     if (!session.login) $window.location = '/login';
      // });
      $scope.totalAdviser = [];
      $scope.advisersActivity = [];
      $scope.customersActivity = [];
      if ($routeParams.circleId) {
          Activity.activityGtr.get({room: $routeParams.circleId}, function (data) {
              $scope.totalAdviser = data.adviser;
              $scope.customersActivity = data.customer;
              $scope.advisersActivity = joinActivity(data.adviser, $scope.customersActivity);
              console.log($scope.advisersActivity);
          });
      }


      //Añade a la lista de advisers que estan atendiendo un turno
      // la informacion de cliente que esta atendiendo
      function joinActivity(adviserList, customerList) {

          function filterById(list, id) {
              return _.filter(list, function (iten) {
                  return iten.token.receiverAdviser.adviserId === id;
              });
          }

          if (!_.size(customerList)) return console.log(adviserList);

          //filtar los clientes que no estan seiendo atendidos
          var customerListFilter = _.filter(customerList, function (customer) {
              return customer.token.receiverAdviser;
          });
          // filtra los asesores que estan atendiendo
          var adviserListFilter = _.filter(adviserList, function (adviser) {
              return adviser.activity.activityEvent.eventCode === '2';
          });

          // para cada asesor atendiendo le asocia el cliente
          _.each(adviserListFilter, function(adviserFilter) {
              var customerAsociate = filterById(customerListFilter, adviserFilter.adviser.adviserId);
              adviserFilter.customer = customerAsociate[0];
          });

          return adviserListFilter;
      }

      $scope.close = function () {
          $mdSidenav('left').toggle()
          .then(function () {
            console.log("close RIGHT is done");
          });
      };
  }]);

})();
