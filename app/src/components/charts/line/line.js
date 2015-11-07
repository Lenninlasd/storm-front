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

          $scope.lineId = $attrs.id;
          console.log($attrs.id);
          new Chartist.Line('#'+$attrs.id, {
              labels: ['1', '2', '3', '4', '5', '6'],
              series: [
                  {
                    name: 'Fibonacci sequence',
                    data: [1, 2, 3, 5, 8, 13]
                  },
                  {
                    name: 'Golden section',
                    data: [1, 1.618, 2.618, 4.236, 6.854, 11.09]
                  }
              ]
            });

      }
})();
