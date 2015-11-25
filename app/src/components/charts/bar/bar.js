(function () {
  'use strict';

  angular
    .module('flugel.components.charts.bar', ['chart.js'])
    .directive('fgChartBar', fgChartBarDirective);

    function fgChartBarDirective() {
      return {
        retrict: 'A',
        scope: {
        },
        controller: chartBarCtrl,
        template: '<canvas chart-bar class="chart"' +
                      'chart-data="data" chart-labels="labels" chart-legend="true" height="{{heights}}">' +
                  '</canvas'
      };
    }
    chartBarCtrl.$inject = ['$scope', '$element', '$attrs'];
    function chartBarCtrl($scope, $element, $attrs) {
      $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
      $scope.series = ['SeriesA', 'SeriesB'];
      $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90],
        [78, 41, 43, 59, 36, 27, 60]
      ];
      $scope.heights = window.innerWidth <= 600 ? 150 : 60;
    }
})();
