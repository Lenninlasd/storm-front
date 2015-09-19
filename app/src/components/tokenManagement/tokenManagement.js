'use strict';

angular
  .module('flugel.components.tokenManagement', [])
  .directive('fgTokenManagement', fgTokenManagementDirective);

  function fgTokenManagementDirective() {
    return {
      retrict: 'E',
      scope: {
      },
      controller: tokenManagementCtrl,
      controllerAs: 'demo',
      templateUrl: 'src/components/tokenManagement/tokenManagement.html',
      link: tokenManagementLink
    };
  }

  function tokenManagementCtrl($scope, $element, $attrs, Token) {
    var self = this;
    self.hidden = false;
    self.direction = 'up';
    self.onlyRead = $attrs.onlyRead === 'true' ? true : false;
    self.stateAttention = 0; // 0 = available, 1 = calling, 2 = in attention
    self.currentToken = {};
    $scope.stateName = ['Disponible', 'Llamando...'];

    self.items = [
        {name: "Nueva transacción", icon: "fa-plus", direction: "left" },
        {name: "Reclasificar servicio", icon: "fa-reply", direction: "left" },
        {name: "Tranferir turno", icon: "fa-exchange", direction: "left" },
        {name: "Terminar turno", icon: "fa-power-off", direction: "left", btnColor: "md-warn"}
    ];
    var adviserInfo = {
          adviserName: 'Lennin',
          adviserLastName: 'Suescun Devia',
          adviserId: 'req.body.adviserId'
    };

    var socket = io('http://192.168.1.71:5000');

    socket.on('newToken', function (data) {
        console.log(data);
        self.stateAttention = 1;
        self.currentToken = data.token;
        self.currentToken.id = data._id;
    });

    $scope.takeToken = function () {
        console.log(adviserInfo);
        var id = {id : self.currentToken.id};
        Token.takeToken.update(id, adviserInfo, function (data) {
            console.log(data);
            self.stateAttention = 2;
        });

    };
  }

  function tokenManagementLink(scope, element, attrs) {
  }
