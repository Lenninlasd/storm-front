(function () {
'use strict';

angular.module('flugel.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'src/views/tokenGenerationView/tokenGeneration.html',
    controllerAs: 'vc1',
    controller: 'TokenGenerationCtrl'
  });
}])
.controller('TokenGenerationCtrl', TokenGenerationCtrl)
.controller('DialogCtrl', DialogCtrl);

TokenGenerationCtrl.$inject = ['$scope', '$mdDialog', '$window', '$cookies', 'Token', 'Activity', 'Login', 'Config', 'socket'];
function TokenGenerationCtrl($scope, $mdDialog, $window, $cookies, Token, Activity, Login, Config, socket) {
    var self = this;

    self.services = [];
    start();

    $scope.activity = {};

    $scope.start = start;
    $scope.goBackStep = goBackStep;
    $scope.nextToDigitName = nextToDigitName;
    $scope.digitName = digitName;
    $scope.choosePurposeVisit = choosePurposeVisit;
    $scope.closeAttention = closeAttention;


    $scope.$on('submitKeyboard', function(event, val) {
        nextToDigitName(val);
    });

    getAdviserInfo();

    socket.on('connect', function() {
        socket.emit('session', {idSession: $cookies.get('session')});
    });

    Token.services.query(function (data) {
        self.services = data;
        console.log(data);
    });

    function start() {
        self.step = 1;
        self.dataCustomer = {
            service:"",
            token: {lineNumber: "", screenName:""}
        };
        $scope.keyboardNumber = "";
    }

    function goBackStep(step) {
        self.step = step;
    }

    function nextToDigitName(val) {
        self.dataCustomer.token.lineNumber = val;
        self.step = 2;
    }

    function digitName() {
        self.step = 3;
    }

    function choosePurposeVisit(ev, service) {
        self.dataCustomer.service = service;

        $mdDialog.show({
            controller: DialogCtrl,
             templateUrl: 'src/views/tokenGenerationView/dialog.html',
             parent: angular.element(document.body),
             targetEvent: ev,
             clickOutsideToClose:false,
             locals: { dataCustomer: self.dataCustomer, branchOffice:  _.last($scope.activity.activity).branchOffice}
        })
        .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
            console.log($scope.status);
            start();
        }, function() {
            $scope.status = 'You cancelled the dialog.';
            console.log($scope.status);
        });
    }

    function getAdviserInfo() {
        Login.login.get(function (session) {
            if (session.login) {
              console.log(session.userData);
              self.dataCustomer.token.adviserName = session.userData.name;
              self.dataCustomer.token.adviserLastName = session.userData.lastName;
              self.dataCustomer.token.adviserId = session.userData.idUser;
              self.dataCustomer.token.adviserEmail = session.userData.email;

                Activity.activity.get(self.dataCustomer.token, function (data) {
                    $scope.activity = data;
                    setEventActivity('0', 'generando turnos');
                });
            }else{
                $window.location = '/login';
            }
        });
    }

    function setEventActivity(eventCode, eventName, callback) {
        // valida si existe actividad
        if (!$scope.activity._id) { $window.location = '#/select'; return; }

        var eventCodeBefore = _.last($scope.activity.activity).activityEvent.eventCode;
        if (eventCodeBefore !== eventCode) {
            var activity = {idActivity: $scope.activity._id, eventCode: eventCode, eventName: eventName};
            Activity.activity.update(activity, function (data) {
                $scope.activity = data;
                if (callback) return callback(data);
            });
        }
        if (callback) return callback(null);
    }

    function closeAttention() {
      setEventActivity('10', 'cerrado', function (data) {
          socket.emit('closeAttention');
          $window.location = '#/select'; return;
      });
    }


}

DialogCtrl.$inject = ['$scope', '$mdDialog', 'dataCustomer', 'branchOffice', 'Token'];
function DialogCtrl($scope, $mdDialog, dataCustomer, branchOffice, Token) {

    dataCustomer.token.numerator = dataCustomer.service.service.numerator;
    dataCustomer.token.motivoVisita = dataCustomer.service.service.serviceName;
    dataCustomer.token.posCode = branchOffice.posCode;
    dataCustomer.token.branchOffice = branchOffice;
    dataCustomer.token.service = {
                                    serviceName: dataCustomer.service.service.serviceName,
                                    serviceId: dataCustomer.service.service.serviceId
                                };

    $scope.dataCustomer = dataCustomer;
    $scope.showTokenResult = false;
    $scope.disableBottonGen = false;

    $scope.tokenGeneration = function () {
        console.log($scope.dataCustomer);
        $scope.disableBottonGen = true;
        Token.tokens.save($scope.dataCustomer.token, function (data) {
            console.log(data.token);
            $scope.generatedToken = data.token.token;
            $scope.showTokenResult = true;
            $scope.disableBottonGen = false;

        }, function (err) {
            console.log(err);
        });
    };

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
}
})();
