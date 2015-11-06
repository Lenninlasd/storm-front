(function () {
'use strict';

angular
  .module('flugel.components.charts.pie', [])
  .directive('fgChartPie', fgChartBarDirective);

  function fgChartBarDirective() {
    return {
      retrict: 'A',
      scope: {
      },
      controller: chartPieCtrl,
      template: '<div class="ct-chart" id="{{pieId}}"></div>'
    };
  }

  function chartPieCtrl($scope, $element, $attrs) {
    $scope.pieId = $attrs.id;

    var data = {
        labels: ['Bananas', 'Apples', 'Grapes'],
        series: [20, 15, 40]
    };

    var options = {
        labelInterpolationFnc: function(value) {
            return value[0];
        }
    };

    var responsiveOptions = [
        ['screen and (min-width: 640px)', {
            chartPadding: 30,
            labelOffset: 100,
            labelDirection: 'explode',
            labelInterpolationFnc: function(value) {
              return value;
            }
        }],
        ['screen and (min-width: 1024px)', {
            labelOffset: 80,
            chartPadding: 20
        }]
    ];

    new Chartist.Pie('#'+$attrs.id, data, options, responsiveOptions);
  }
})();
