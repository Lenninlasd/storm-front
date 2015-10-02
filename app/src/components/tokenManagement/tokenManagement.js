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
    socket.on('resultService', function (data) {
        console.log(self.tokenInAttention.token.infoToken.services);
        console.log(data.token.infoToken.services);
        self.tokenInAttention = data;
        $mdDialog.hide();
    })

    // valida que se esté atendiendo un turno
    function checkIfAttending() {
      Token.tokens.query({state: 2}, function (data) {
          if (data.length) {
              self.stateAttention = 2;

              self.tokenInAttention =  _.find(data, function (obj) {return  obj.token.receiverAdviser.adviserId === adviserInfo.adviserId;});
              $scope.waitTime = diffTime(self.tokenInAttention.token.infoToken.logCreationToken, self.tokenInAttention.token.infoToken.logCalledToken);
              $scope.callTime = diffTime(self.tokenInAttention.token.infoToken.logCalledToken, self.tokenInAttention.token.infoToken.logAtentionToken);
              console.log(self.tokenInAttention);
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
            initService();
        });
    }

    function closeToken() {
      var confirm = $mdDialog.confirm()
          .title('¿Desea teminar el turno?')
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

    function showDialog(locals, fnSuccess, fnError){
        fnSuccess =  fnSuccess || function () {return undefined;};
        fnError =  fnError || function () {return undefined;};
        $mdDialog.show({
            controller: servicesCtrl,
            controllerAs: 'demo',
            templateUrl:  'src/components/tokenManagement/serviceList.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            targetEvent: null,
            locals: locals
        }).then(fnSuccess, fnError);
    }

    function newService() {
        var locals = {
            tokenData: {token: self.tokenInAttention},
            mode: 'insert'
        };
        showDialog(locals);
    }

    function initService() {
        var locals = {
            tokenData: {token: self.tokenInAttention},
            mode: 'initInsert'
        };
        showDialog(locals);
    }

    function editService(idToken, service) {
        $scope.visibleTooltip = false;
        var locals =  {
            tokenData: {token: self.tokenInAttention, service: service},
            mode: 'edit'
        };
        function fnSuccess() {
          $scope.visibleTooltip = true;
        };

        showDialog(locals, fnSuccess);
    }

    function servicesCtrl($scope, Token, $mdDialog, Config, tokenData, mode) {
        var self = this;
        self.services = [];
        self.mode = mode;
        $scope.selectedService = '';
        //console.log(tokenData.service);
        if (mode === 'edit') {
            $scope.selectedService = tokenData.service.serviceId;
        }else if (mode === 'insert') {
            $scope.selectedService = '';
            console.log(tokenData.token.token.motivoVisita);
        }else if (mode === 'initInsert') {
            $scope.selectedService = tokenData.token.token.motivoVisita.serviceId;
        }

        var socket = io(Config.protocol + '://' + Config.ip + ':' + Config.port);

        Token.services.query(function (data) {
            self.services = data;
            //console.log(data);
        });

        $scope.cancel = function() {
             $mdDialog.cancel();
         };

        $scope.choosePurposeVisit = function(ev, serviceData){
            //console.log(serviceData);
            $scope.selectedService = serviceData.service.serviceId;
            //console.log($scope.selectedService);
        };

        $scope.goBackStep = function () {
            $scope.selectedService = '';
            $scope.searchText = '';
        };

        $scope.actionService = function (argument) {
            // body...
        }

        $scope.insertService = function (serviceData, subService) {
            var service = _.clone(serviceData.service);
            service.subServices = [subService];

            if (mode === 'insert'  || mode === 'initInsert') {
                socket.emit('insertService', {id: tokenData.token._id, service: service});
            }else if (mode === 'edit') {
                //console.log(tokenData.service); //servicio actual del turno
                console.log({
                  idToken: tokenData.token._id,
                  idService: tokenData.service._id,
                  subServices: service.subServices
                });
                socket.emit('updateSubservice', {
                  idToken: tokenData.token._id,
                  idService: tokenData.service._id,
                  subServices: service.subServices
                });
            }

        };
    }

  }


  function tokenManagementLink(scope, element, attrs) {
  }
