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

TokenGenerationCtrl.$inject = ['$scope', '$mdDialog', 'Token'];
function TokenGenerationCtrl($scope, $mdDialog, Token) {
    var self = this;
    self.services = [];
    start();
    $scope.start = start;
    $scope.goBackStep = goBackStep;
    $scope.nextToDigitName = nextToDigitName;
    $scope.digitName = digitName;
    $scope.choosePurposeVisit = choosePurposeVisit;

    $scope.$on('submitKeyboard', function(event, val) {
        nextToDigitName(val);
    });

    Token.services.query(function (data) {
        self.services = data;
    });

    function start() {
        self.step = 1;
        self.dataCustomer = {
            service:"",
            token: {
              lineNumber: "",
              screenName:"",
              consecutive: 12,
              adviserName: "Pablito Emilio",
              adviserLastName: "Escobar Gaviria",
              adviserId: "QuiboPues"
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


}

DialogCtrl.$inject = ['$scope', '$mdDialog', 'dataCustomer', 'Token'];
function DialogCtrl($scope, $mdDialog, dataCustomer, Token) {

    dataCustomer.token.numerator = dataCustomer.service.service.subServices[0].numerador;
    dataCustomer.token.motivoVisita = dataCustomer.service.service.serviceName;
    $scope.dataCustomer = dataCustomer;
    $scope.showTokenResult = false;

    $scope.tokenGeneration = function () {
        console.log($scope.dataCustomer.token);
        Token.tokens.save($scope.dataCustomer.token, function (data) {
            console.log(data.token);
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
