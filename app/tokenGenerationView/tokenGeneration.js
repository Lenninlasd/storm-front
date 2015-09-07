'use strict';

angular.module('flugel.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'tokenGenerationView/tokenGeneration.html',
    controllerAs: 'vc1',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', View1Ctrl)
.controller('DialogController', DialogController);

View1Ctrl.$inject = ['$scope', '$mdDialog', 'Turno'];
function View1Ctrl($scope, $mdDialog, Turno) {
    var vc1 = this;
    vc1.services = [];
    start();
    $scope.start = start;
    $scope.goBackStep = goBackStep;
    $scope.nextToDigitName = nextToDigitName;
    $scope.digitName = digitName;
    $scope.choosePurposeVisit = choosePurposeVisit;

    $scope.$on('submitKeyboard', function(event, val) {
        nextToDigitName(val);
    });

    Turno.services.query(function (data) {
        vc1.services = data;
        console.log(data);
    });

    function start() {
        vc1.step = 1;
        vc1.dataCustomer = {id: "", name:"", service:""};
        $scope.keyboardNumber = "";
    }

    function goBackStep(step) {
        vc1.step = step;
    }

    function nextToDigitName(val) {
        vc1.dataCustomer.id = val;
        vc1.step = 2;
        console.log(vc1);
    }

    function digitName() {
        vc1.step = 3;
        console.log(vc1);
    }

    function choosePurposeVisit(ev, service) {
        vc1.dataCustomer.service = service;
        console.log(vc1);

        $mdDialog.show({
            controller: DialogController,
             templateUrl: 'tokenGenerationView/dialog.html',
             parent: angular.element(document.body),
             targetEvent: ev,
             clickOutsideToClose:true,
             locals: { dataCustomer: vc1.dataCustomer }
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

DialogController.$inject = ['$scope', '$mdDialog', 'dataCustomer'];
function DialogController($scope, $mdDialog, dataCustomer) {
    console.log(dataCustomer);
    $scope.dataCustomer = dataCustomer;
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
