(function () {
'use strict';

angular
  .module('flugel.components.charts.pie', ['googlechart'])
  .directive('fgChartPie', fgChartBarDirective);

  function fgChartBarDirective() {
    return {
      retrict: 'A',
      scope: {
      },
      controller: chartPieCtrl,
      template: '<canvas id="pie" class="chart chart-pie"' +
                  'chart-data="data" chart-labels="labels" chart-legend="true" height="{{heights}}">' +
                '</canvas> '
    };
  }

  chartPieCtrl.$inject = ['$scope', '$element', '$attrs'];
  function chartPieCtrl($scope, $element, $attrs) {
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];
    $scope.heights = window.innerWidth <= 600 ? 150 : 50;
  }
})();
