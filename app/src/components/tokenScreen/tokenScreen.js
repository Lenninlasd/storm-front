(function () {
'use strict';

angular
  .module('flugel.components.tokenScreen', [])
  .directive('fgTokenScreen', fgKeyboardDirective);

  function fgKeyboardDirective() {
    return {
      retrict: 'E',
      scope: {},
      controller: tokenScreenCtrl,
      templateUrl: 'src/components/tokenScreen/tokenScreen.html'
    };
  }
  tokenScreenCtrl.$inject = ['$scope', '$element','$attrs', 'Token', 'Config', 'socket'];
  function tokenScreenCtrl($scope, $element, $attrs, Token, Config, socket) {
      $scope.pendingTokens = [];

      Token.tokens.query({state: 0}, (data) => {
          $scope.pendingTokens = data;
          console.log(data);
      });

      socket.on('newToken', (data) => {
          console.log(data);
          Token.tokens.query({state: 0}, (data) => {
              $scope.pendingTokens = data;
          });
      });
      socket.on('takeToken', () => {
        Token.tokens.query({state: 0}, (data) => {
            $scope.pendingTokens = data;
        });
      });
  }

})();
