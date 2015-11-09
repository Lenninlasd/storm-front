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
    chartBarCtrl.$inject = ['$scope', '$element', '$attrs'];
    function chartBarCtrl($scope, $element, $attrs) {

      $scope.barId = $attrs.id;
      var data = {
          labels: ['Disponible', 'Ocupado', 'Breack', 'Alm', 'Cap'],
          series: [
            [50, 14, 32, 7, 5]
          ]
      };

      var options = {
          seriesBarDistance: 2
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
