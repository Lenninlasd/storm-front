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

TokenGenerationCtrl.$inject = ['$scope', '$mdDialog', '$window', 'Token', 'Activity', 'Login'];
function TokenGenerationCtrl($scope, $mdDialog, $window, Token, Activity, Login) {
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

    Token.services.query(function (data) {
        self.services = data;
        console.log(data);
    });

    function start() {
        self.step = 1;
        self.dataCustomer = {
            service:"",
            token: {
              lineNumber: "",
              screenName:"",
              // adviserName: "Pablito Emilio",
              // adviserLastName: "Escobar Gaviria",
              // adviserId: "QuiboPues"
            }
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
             locals: { dataCustomer: self.dataCustomer }
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
                    setEventActivity('0', 'generateToken');
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
      setEventActivity('10', 'closed', function (data) {
          $window.location = '#/select'; return;
      });
    }


}

DialogCtrl.$inject = ['$scope', '$mdDialog', 'dataCustomer', 'Token'];
function DialogCtrl($scope, $mdDialog, dataCustomer, Token) {
    console.log(dataCustomer);
    dataCustomer.token.numerator = dataCustomer.service.service.numerator;
    dataCustomer.token.motivoVisita = dataCustomer.service.service.serviceName;
    dataCustomer.token.service = {
                                    serviceName: dataCustomer.service.service.serviceName,
                                    serviceId: dataCustomer.service.service.serviceId
                                };

    $scope.dataCustomer = dataCustomer;
    $scope.showTokenResult = false;

    $scope.tokenGeneration = function () {
        Token.tokens.save($scope.dataCustomer.token, function (data) {
            console.log(data.token);
            $scope.generatedToken = data.token;
            $scope.showTokenResult = true;

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
