(function () {
  'use strict';

  angular
    .module('flugel.components.charts.barAHT', ['chart.js'])
    .directive('fgChartBarAht', fgChartBarDirective);

    function fgChartBarDirective() {
      return {
        retrict: 'A',
        scope: {
        },
        controller: chartBarCtrl,
        template: '<div class="hello">' +
                    '<canvas chart-bar class="chart" chart-legend="true" chart-options="option"' +
                        'chart-data="data" chart-labels="labels" chart-series="series" height="{{heights}}">' +
                    '</canvas' +
                  '</div>' +
                  '<div class="papapap">' +
                      'hellllllllllllllooooooooooooooo' +
                  '</div>'
      };
    }
    chartBarCtrl.$inject = ['$scope', '$element', '$attrs'];
    function chartBarCtrl($scope, $element, $attrs) {
      $scope.labels = ["14", "24", "35", "27", "16", "30", "40"];
      $scope.series = ['AHT min', 'AHT min (20-11-15)'];
      $scope.data = [
        [28, 48, 40, 19, 86, 27, 90],
        [30, 59, 65, 41, 60, 55, 60]
      ];
      $scope.option= {
        scaleShowGridLines : false,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
      };

      if(window.innerWidth < 600){
          $scope.heights = 120;
      }else if(window.innerWidth >= 600 && window.innerWidth <= 960) {
          $scope.heights = 200;
      }else {
          $scope.heights = 80;
      }
    }
})();
