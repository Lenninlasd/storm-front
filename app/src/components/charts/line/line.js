(function () {
    'use strict';

    angular
      .module('flugel.components.charts.line', [])
      .directive('fgChartLine', fgChartLineDirective);

      function fgChartLineDirective() {
        return {
          retrict: 'A',
          scope: {
          },
          controller: chartLineCtrl,
          link: chartLineLink,
          template: '<canvas id="line" class="chart chart-line" chart-data="data"' +
                      'chart-labels="labels" chart-legend="true" chart-series="series"' +
                      'chart-click="onClick" chart-options="options" height="{{heights}}"' +
                    '</canvas>'
        };
      }
      chartLineCtrl.$inject = ['$scope', '$element', '$attrs'];
      function chartLineCtrl($scope, $element, $attrs) {
        $scope.labels = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"];
        $scope.series = ['NS', 'NS acumulado'];
        $scope.data = [
          [28, 48, 40, 19, 86, 27, 90],
          [30, 59, 65, 41, 60, 55, 60]          
        ];
        $scope.options = {scaleShowGridLines : false};
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };

      }

      function chartLineLink(scope, element, attrs) {
          scope.heights = window.innerWidth <= 600 ? 150 : 40;
      }
})();
