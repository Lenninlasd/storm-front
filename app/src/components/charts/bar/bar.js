(function () {
  'use strict';

  angular
    .module('flugel.components.charts.bar', [])
    .directive('fgChartBar', fgChartBarDirective);

    function fgChartBarDirective() {
      return {
        retrict: 'A',
        scope: {
        },
        controller: chartBarCtrl,
        template: '<div class="ct-chart" id="{{barId}}"></div>'
      };
    }

    function chartBarCtrl($scope, $element, $attrs) {

      $scope.barId = $attrs.id;
      var data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
            [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
          ]
      };

      var options = {
          seriesBarDistance: 10
      };

      var responsiveOptions = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                  return value[0];
              }
            }
          }]
      ];

      new Chartist.Bar('#'+$attrs.id, data, options, responsiveOptions)
      .on('draw', function(data) {
          if(data.type === 'bar') data.element.attr({style: 'stroke-width: '+ $attrs.ancho});
      });
    }
})();