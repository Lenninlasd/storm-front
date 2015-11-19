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
          template: '<div class="ct-chart" id="{{lineId}}"></div>'
        };
      }
      chartLineCtrl.$inject = ['$scope', '$element', '$attrs'];
      function chartLineCtrl($scope, $element, $attrs) {
          var data = {
              labels: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30'],
              series: [
                  {
                    name: 'NS',
                    data: [100, 60, 83, 75, 90, 88]
                  },
                  {
                    name: 'NS Acumulado',
                    data: [100, 83, 85, 70, 60, 86]
                  }
              ]
            };
          $scope.lineId = $attrs.id;

          new Chartist.Line('#'+$attrs.id, data, {
            plugins: [
              Chartist.plugins.ctPointLabels({
                textAnchor: 'middle'
              }),
              // Chartist.plugins.tooltip()
            ]
          });

      }
})();
