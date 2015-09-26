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

  function tokenManagementCtrl($scope, $element, $attrs, $interval, $mdDialog, Token, Config) {
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
    $scope.visibleTooltip = true;
    var stopTime;
    self.items = [
        {name: "Nuevo servicio", icon: "fa-plus", direction: "left" },
        //{name: "Editar servicio", icon: "fa-reply", direction: "left" },
        {name: "Tranferir turno", icon: "fa-exchange", direction: "left" },
        {name: "Terminar turno", icon: "fa-power-off", direction: "left", btnColor: "md-warn"}
    ];
    var adviserInfo = {
          adviserName: 'Lennin',
          adviserLastName: 'Suescun Devia',
          adviserId: 'req.body.adviserId'
    };

    //var socket = io('http://192.168.1.71:5000');
    var socket = io(Config.protocol + '://' + Config.ip + ':' + Config.port);

    checkIfAttending();

    $scope.takeToken = takeToken;

    $scope.tokenAction = tokenAction;

    $scope.editService = editService;

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

              self.tokenInAttention =  _.find(data, function (obj) {return  obj.token.receiverAdviser.adviserId === adviserInfo.adviserId;});
              $scope.waitTime = diffTime(self.tokenInAttention.token.infoToken.logCreationToken, self.tokenInAttention.token.infoToken.logCalledToken);
              $scope.callTime = diffTime(self.tokenInAttention.token.infoToken.logCalledToken, self.tokenInAttention.token.infoToken.logAtentionToken);

              stopTime = $interval(callAtInterval, 200, false);
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
        var id = {id : data._id};
        console.log(data);

        Token.callToken.update(id, function (data2) {
             console.log(data2);
             self.stateAttention = 1;
             self.tokenToBeTaken = data.token;
             self.tokenToBeTaken.id = data._id;
        });
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
            $scope.waitTime = diffTime(self.tokenInAttention.token.infoToken.logCreationToken, self.tokenInAttention.token.infoToken.logCalledToken);
            $scope.callTime = diffTime(self.tokenInAttention.token.infoToken.logCalledToken, self.tokenInAttention.token.infoToken.logAtentionToken);
            stopTime = $interval(callAtInterval, 200);
        });
    }

    function newService(ev, idToken) {
        console.log(idToken);
        $mdDialog.show({
            //controller: DialogController,
            template:  '<div layout="row" layout-fill  layout-align="center center">' +
                           '<md-dialog aria-label="List services"  flex-md="70" flex-gt-md="70" flex-sm="100" style="overflow: hidden;max-width: 100%;">' +
                                '<fg-manage-services></fg-manage-services>' +
                           '</md-dialog>' +
                       '</div>',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            targetEvent: ev
        }).then(function() {
        });
    }

    function closeToken() {
      var confirm = $mdDialog.confirm()
          .title('¿Desea teminar el turno?')
          //content('Texto')
          .ariaLabel('End token')
          .ok('Terminar')
          .cancel('Continuar');
       $mdDialog.show(confirm).then(function() {
           var id = {id: self.tokenInAttention._id};
           console.log(id);
           Token.closeToken.update(id, function (data) {
               $interval.cancel(stopTime);
               available();
               callToken();
           });

       }, function() {

       });
    }

    function tokenAction(sw) {
        // closeToken
        if (sw === 0) {
            newService();
        }else if (sw === 2) {
            closeToken();
        }
    }

    function editService(ev, idToken, service) {
        console.log(idToken, service);
        $scope.visibleTooltip = false;
        $mdDialog.show({
            //controller: DialogController,
            template:  '<div layout="row" layout-fill  layout-align="center center">' +
                           '<md-dialog aria-label="List services"  flex-md="70" flex-gt-md="70" flex-sm="100" style="overflow: hidden;max-width: 100%;">' +
                                '<fg-manage-services></fg-manage-services>' +
                           '</md-dialog>' +
                       '</div>',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            targetEvent: ev
        }).then(function() {
          $scope.visibleTooltip = true;
        },function () {
          $scope.visibleTooltip = true;
        });
    }



  }


  function tokenManagementLink(scope, element, attrs) {
  }
