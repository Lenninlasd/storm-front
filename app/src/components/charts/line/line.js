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
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series Lennin'];
        $scope.data = [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
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
