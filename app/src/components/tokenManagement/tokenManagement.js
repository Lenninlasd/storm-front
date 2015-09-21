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

  function tokenManagementCtrl($scope, $element, $attrs, $interval, Token) {
    var self = this;
    self.hidden = false;
    self.direction = 'up';
    self.onlyRead = $attrs.onlyRead === 'true' ? true : false;
    self.stateAttention = 0; // 0 = available, 1 = calling, 2 = in attention
    self.tokenToBeTaken = {};
    self.tokenInAttention = {};
    $scope.attentionTime = "00:00:00";
    $scope.waitTime = "00:00:00";
    $scope.callTime = "00:00:00";
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

    checkIfAttending();

    $scope.takeToken = takeToken;

    $scope.tokenAction = tokenAction;

    //socket.on('newToken', getPendingToken);
    socket.on('newToken', function (data) {
        if (self.stateAttention === 0) {
            getPendingToken(data);
        }
    });

    // valida que se esté atendiendo un turno
    function checkIfAttending() {
      Token.tokens.query({state: 2}, function (data) {
          if (data.length) {
              self.stateAttention = 2;
              //console.log(data);
              self.tokenInAttention =  _.find(data, function (obj) {return  obj.token.receiverAdviser.adviserId === adviserInfo.adviserId;});
              console.log(self.tokenInAttention);
              $scope.waitTime = diffTime(self.tokenInAttention.token.infoToken.logCreationToken, self.tokenInAttention.token.infoToken.logAtentionToken);
              $interval(callAtInterval, 200, false);
          }else{
              // si está disponible llama el turno
              callToken();
          }
      });
    }

    function callAtInterval() {
        $scope.attentionTime = diffTime(self.tokenInAttention.token.infoToken.logAtentionToken, false);
    }

    function diffTime(iniTime, endTime) {
        var momentIniTime = iniTime ? moment(iniTime): moment();
        var momentEndTime = endTime ? moment(endTime) : moment();
        return moment.utc(momentEndTime.diff(momentIniTime)).format("HH:mm:ss");
    }

    function available() {
        self.stateAttention = 0; // 0 = available, 1 = calling, 2 = in attention
        self.tokenToBeTaken = {};
        self.tokenInAttention = {};
    }

    function getPendingToken(data) {
        self.stateAttention = 1;
        self.tokenToBeTaken = data.token;
        self.tokenToBeTaken.id = data._id;
    }
    function callToken() {
        Token.tokens.query({state: 0}, function (data) {
            if (data.length) {
                console.log(data);
                getPendingToken(data[0]);
            }
        });
    }

    function takeToken() {
        var id = {id : self.tokenToBeTaken.id};
        Token.takeToken.update(id, adviserInfo, function (data) {
            self.stateAttention = 2;
            self.tokenInAttention = data;
            $scope.waitTime = diffTime(self.tokenInAttention.token.infoToken.logCreationToken, self.tokenInAttention.token.infoToken.logAtentionToken);
            $interval(callAtInterval, 200);
        });
    }

    function tokenAction(sw) {
        // closeToken
        if (sw === 3) {
            var id = {id: self.tokenInAttention._id};
            console.log(id);
            Token.closeToken.update(id, function (data) {
                available();
                callToken();
            });
        }
    }
  }

  function tokenManagementLink(scope, element, attrs) {
  }
