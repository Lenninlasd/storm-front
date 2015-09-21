'use strict';

angular
  .module('flugel.components.tokenScreen', [])
  .directive('fgTokenScreen', fgKeyboardDirective);

  function fgKeyboardDirective() {
    return {
      retrict: 'E',
      scope: {},
      controller: tokenScreenCtrl,
      templateUrl: 'src/components/tokenScreen/tokenScreen.html',
      link: tokenScreenLink
    };
  }

  function tokenScreenCtrl($scope, $element, $attrs, Token, Config) {
      $scope.pendingTokens = [];
      //var socket = io('http://192.168.1.71:5000');
      var socket = io(Config.protocol + '://' + Config.ip + ':' + Config.port);

      Token.tokens.query({state: 0}, function (data) {
          $scope.pendingTokens = data;
          console.log(data);
      });

      socket.on('newToken', function (data) {
          console.log(data);
          Token.tokens.query({state: 0}, function (data) {
              $scope.pendingTokens = data;
          });
      });
      socket.on('takeToken', function () {
        Token.tokens.query({state: 0}, function (data) {
            $scope.pendingTokens = data;
        });
      });
  }

  function tokenScreenLink(scope, element, attrs) {
  }
