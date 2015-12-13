(function () {
'use strict';

angular
  .module('flugel.components.selectionRole', [])
  .directive('fgSelectionRole', fgSelectionRoleDirective);

  function fgSelectionRoleDirective() {
    return {
      retrict: 'E',
      scope: {
      },
      controller: selectionRoleDirectiveCtrl,
      templateUrl: 'src/components/selectionRole/selectionRole.html'
    };
  }

  selectionRoleDirectiveCtrl.$inject = ['$scope', '$element','$attrs', 'Login', 'Activity', '$window', 'socket', 'BranchOffice'];
  function selectionRoleDirectiveCtrl($scope, $element, $attrs, Login, Activity, $window, socket, BranchOffice) {
    var adviserInfo = {};
    var userSession;
    var redirection;

    $scope.data = {};
    $scope.activity = {};
    $scope.roles = [
        {code: '0', name: 'Orientador'},
        {code: '1', name: 'Servicio'},
        {code: '2', name: 'Venta'}
    ];
    $scope.terminals =  [];

    Login.login.get(function (session) {
          if (!session.login) {
            $window.location = '/login'; return;
          }else{
            $scope.branchOffices = session.userData.circleList.branchOffices;
            userSession = session.userData;
            adviserInfo = {
                  adviserName: userSession.name,
                  adviserLastName: userSession.lastName,
                  adviserId: userSession.idUser,
                  adviserEmail: userSession.email
            };
            Activity.activity.get(adviserInfo, function (activities) {
                if (!activities._id) return;

                $scope.activity = activities;

                var activitiesList = _.last(activities.activity);
                var closeEvent = activitiesList.activityEvent.eventCode;
                if (closeEvent !== '10') {
                    if (activitiesList.role.code === '0') {
                        $window.location = '#/view1'; return;
                    }else {
                        $window.location = '#/view2'; return;
                    }
                }else{
                    $scope.data.role = activitiesList.role.code;
                    $scope.data.branchOffice = activitiesList.branchOffice.posCode;
                    //
                    terminalList(activitiesList.branchOffice.posCode, function (terminals) {
                        $scope.terminals = terminals;
                        BranchOffice.availableTerminals.query({posCode: activitiesList.branchOffice.posCode}, function (availableTerminals) {
                            console.log(availableTerminals);
                            joinTerminalBusy($scope.terminals, availableTerminals)
                            console.log($scope.terminals);
                            $scope.data.terminal = activitiesList.branchOffice.terminal.terminalId;
                        });
                    });
                }
            });
          }
      });

    $scope.setConfData = function () {
        console.log($scope.branchOffices);
        if (!$scope.branchOffices) return console.log('closed');

        var branchOffice = _.clone(_.findWhere($scope.branchOffices, {posCode: $scope.data.branchOffice}));
        branchOffice.blueCircle = branchOffice.blueCircles[0]; //*** temporal
        branchOffice.terminal = _.findWhere($scope.terminals, {terminalId: $scope.data.terminal});
        delete branchOffice.blueCircles;

        var role = _.findWhere($scope.roles, {code: $scope.data.role});

        //Obtiene la información de branchOffice, terminal y rol
        adviserInfo.role = role;
        adviserInfo.branchOffice = branchOffice;

        //check if terminal is take *** backlog

        if (_.size($scope.activity)) {
            //validar si hubo cambio de rol o terminal
            var activity = {idActivity: $scope.activity._id, eventCode: '10', eventName: 'closed'};
            activity.terminal = branchOffice.terminal;
            activity.role = role;
            Activity.activity.update(activity, function (data) {
                $scope.activity = data;
                socket.emit('selectionRole'); // Se une al canal del circulo Azul
                redirectActivity(data);
            });
        }else{
            Activity.activity.save(adviserInfo, function (data) {
                $scope.activity = data;
                redirectActivity(data);
            }, function (err) {
                console.log(err);
            });
        }

    };

    $scope.setTerminal = function (posCode) {
        terminalList(posCode, function (terminals) {
            $scope.terminals = terminals;
        });
    };

    function terminalList(posCode, callback) {
        BranchOffice.terminal.get({posCode: posCode}, function(branchOfficeTerminals){
            return callback(branchOfficeTerminals.terminals[0]);
        });
    }

    function joinTerminalBusy(terminalList, availableTerminals) {
        var sw = 0;
        _.map(terminalList, function (terminal) {
            _.each(availableTerminals, function (availableTerminal) {
                if (terminal.terminalId === availableTerminal.terminal.terminalId) {
                    terminal.disable = true; sw++; return;
                }
            });
            if (sw === availableTerminals.length) return;
        });
    }

    function redirectActivity(data) {
        var roleCode = _.last(data.activity).role.code;
        if (roleCode === '0') {
            $window.location = '#/view1'; return;
        }else{
            $window.location = '#/view2'; return;
        }
    }
  }
})();
