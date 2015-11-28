(function () {
  'use strict';

  angular
    .module('flugel.components.charts.barNS', ['chart.js'])
    .directive('fgChartBarNs', fgChartBarDirective);

    function fgChartBarDirective() {
      return {
        retrict: 'A',
        scope: {
        },
        controller: chartBarCtrl,
        template: '<canvas chart-bar class="chart" chart-options="option" chart-series="series"' +
                      'chart-data="data" chart-labels="labels" chart-legend="true" height="{{heights}}">' +
                  '</canvas'
      };
    }
    chartBarCtrl.$inject = ['$scope', '$element', '$attrs'];
    function chartBarCtrl($scope, $element, $attrs) {
      $scope.labels = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"];
      $scope.series = ['NS %', 'NS acumulado %'];
      $scope.data = [
        [28, 48, 40, 19, 86, 27, 90],
        [30, 59, 65, 41, 60, 55, 60]
      ];
      $scope.option= {
        scaleShowGridLines : false,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
      };

      // $scope.heights = window.innerWidth <= 600 ? 150 : 60;
      if(window.innerWidth < 600){
          $scope.heights = 150;
      }else if(window.innerWidth >= 600 && window.innerWidth <= 960) {
          $scope.heights = 90;
      }else {
          $scope.heights = 35;
      }
    }
})();
