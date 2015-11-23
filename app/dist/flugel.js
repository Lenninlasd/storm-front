(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('flugel', [
      'ngRoute',
      'ngMaterial',
      'ngCookies',
      'flugel.themes',
      'flugel.services',
      'flugel.views',
      'flugel.components',
    ]).
    config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/'});
    }])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push(['$cookies', '$location', '$q', function ($cookies, $location, $q) {
            return {
              request : function (config) {
                  if ($cookies.get('session')) {
                      config.headers.authorization = $cookies.get('session');
                  }
                  return config;
              },
            };
        }]);
    }]);
})();

angular
  .module('flugel.components',[
    'flugel.components.keyboard',
    'flugel.components.tokenScreen',
    'flugel.components.longpress',
    'flugel.components.tokenManagement',
    'flugel.components.manageServices',
    'flugel.components.selectionRole',
    'flugel.components.charts',
    'flugel.components.sidenav',
    'flugel.components.gtr'
  ]);

angular
  .module('flugel.views',[
    'flugel.view1',
    'flugel.view2',
    'flugel.views.selectionRole',
    'flugel.views.dash'
  ]);

(function () {
    'use strict';

    angular.module('flugel.themes', [])
    .config(['$mdThemingProvider', function($mdThemingProvider) {
      $mdThemingProvider.definePalette('amazingPaletteName', {
        '50': 'ffebee',
        '100': 'ffcdd2',
        '200': 'ef9a9a',
        '300': 'e57373',
        '400': 'b71c1c',
        '500': '9FB4CF',
        '600': 'e53935',
        '700': 'd32f2f',
        '800': 'c62828',
        '900': 'b71c1c',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
         '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
      });
      $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('amazingPaletteName').dark();
    }]);
})();

angular
  .module('flugel.components.charts', [
    'flugel.components.charts.bar',
    'flugel.components.charts.pie',
    'flugel.components.charts.line'
  ]);

angular
  .module('flugel.components.gtr',[
    'flugel.components.gtr.activityAdviser',
    'flugel.components.gtr.header'
  ]);

(function () {
'use strict';

angular
  .module('flugel.components.keyboard', [])
  .directive('fgKeyboard', fgKeyboardDirective);

  function fgKeyboardDirective() {
    return {
      retrict: 'E',
      scope: {
        keyboardNumber: "=keyboardnumber"
      },
      controller: keyboardCtrl,
      templateUrl: 'src/components/keyboard/keyboard.html'
    };
  }
  keyboardCtrl.$inject = ['$scope', '$element', '$attrs', '$rootScope'];
  function keyboardCtrl($scope, $element, $attrs, $rootScope) {
    // Máximo numero de degitos aceptados (deberia cambiarse por una ReGex)
    var maxNumber = 10;
    var minNumber = 4;

    $scope.keyboard = "";
    $scope.keyboardNumber = "";

    $scope.addNumber = function (number) {
        $scope.keyboardNumber = $scope.keyboardNumber + number;
    };
    $scope.setNumber = function () {
        $scope.keyboard = $scope.keyboardNumber;

        if ($scope.keyboard.length >= minNumber && $scope.keyboard.length <= maxNumber) {
            $rootScope.$broadcast('submitKeyboard', $scope.keyboard);
        }else{
            alert('No es un número válido')
        }
    };
    $scope.clearKeyboard = function () {
        $scope.keyboardNumber = $scope.keyboardNumber.slice(0,-1);
        // $scope.keyboard = "";
        // $scope.keyboardNumber = "";
    };
  }
})();

(function () {
'use strict';

angular
  .module('flugel.components.longpress', [])
  .directive('fgLongpress', fgLongpressDirective);

  function fgLongpressDirective() {
    return {
      retrict: 'A',
      controller: longpressCtrl,
      scope: {}
    };
  }

  longpressCtrl.$inject = ['$scope', '$element', '$attrs', '$rootScope', '$timeout'];
  function longpressCtrl($scope, $element, $attrs, $rootScope, $timeout) {

    var timeout = null;
    $scope.message = "Don't press me to hard";
    console.log($scope.message);
    $element.bind('mousedown', function (e) {
        timeout = $timeout(function(){
            $scope.message = "Ouch";
            console.log('long press');
        }, 1000);
    });
    $element.bind('mouseup', function (e) {
        timeout = null;
    });
    // $scope.setNumber = function () {
    //     $scope.keyboard = $scope.keyboardNumber;
    //
    //     if ($scope.keyboard.length >= minNumber && $scope.keyboard.length <= maxNumber) {
    //         $rootScope.$broadcast('submitKeyboard', $scope.keyboard);
    //     }else{
    //         alert('No es un número válido')
    //     }
    // };
  }
})();

(function () {
'use strict';

angular
  .module('flugel.components.manageServices', [])
  .directive('fgManageServices', fgManageServicestDirective);

  function fgManageServicestDirective() {
    return {
      retrict: 'E',
      scope: {
      },
      controller: servicesCtrl,
      controllerAs: 'demo',
      templateUrl: 'src/components/manageServices/manageServices.html'
    };
  }
  servicesCtrl.$inject = ['$scope', '$element','$attrs', 'Token', '$mdDialog', 'Config', 'socket'];
  function servicesCtrl($scope, $element, $attrs, Token, $mdDialog, Config, socket) {
      var self = this;
      self.services = [];
      $scope.selectedService = '';

      console.log($attrs);
      Token.services.query(function (data) {
          self.services = data;
          console.log(data);
      });

      $scope.cancel = function() {
           $mdDialog.cancel();
       };

      $scope.choosePurposeVisit = function(ev, serviceData){
          console.log(serviceData);
          $scope.selectedService = serviceData._id;
      };

      $scope.goBackStep = function () {
          $scope.selectedService = '';
          $scope.searchText = '';
      };

      $scope.insertService = function (serviceData, subService) {
          serviceData.service.subServices = [subService];
          console.log(serviceData.service);
          //socket.emit('insertService', serviceData.service);
      };
  }
})();

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

  selectionRoleDirectiveCtrl.$inject = ['$scope', '$element','$attrs', 'Login', 'Activity', '$window', 'socket'];
  function selectionRoleDirectiveCtrl($scope, $element, $attrs, Login, Activity, $window, socket) {
    var adviserInfo = {};
    var userSession;
    var redirection;

    $scope.data = {};
    $scope.activity = {};

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
                    $scope.data.terminal = activitiesList.branchOffice.terminal.terminalId;
                    console.log($scope.data);
                }
            });
          }
      });
    // venta: 0, servicio: 1, orientador:2
    $scope.roles = [
        {code: '0', name: 'Orientador'},
        {code: '1', name: 'Servicio'},
        {code: '2', name: 'Venta'}
    ];
    $scope.terminals =  [
      {terminalId: '1', terminalName: 'Terminal 1'},
      {terminalId: '2', terminalName: 'Terminal 2'},
      {terminalId: '3', terminalName: 'Terminal 3'},
      {terminalId: '4', terminalName: 'Terminal 4'},
      {terminalId: '5', terminalName: 'Terminal 5'},
      {terminalId: '6', terminalName: 'Terminal 6'},
    ];

    $scope.setConfData = function () {
        console.log($scope.branchOffices);
        if (!$scope.branchOffices) return console.log('closed');

        var branchOffice = _.clone(_.findWhere($scope.branchOffices, {posCode: $scope.data.branchOffice}));
        branchOffice.blueCircle = branchOffice.blueCircles[0]; //*** tempo
        branchOffice.terminal = _.findWhere($scope.terminals, {terminalId: $scope.data.terminal});
        delete branchOffice.blueCircles;

        var role = _.findWhere($scope.roles, {code: $scope.data.role});
        adviserInfo.role = role;
        adviserInfo.branchOffice = branchOffice;

        if (_.size($scope.activity)) {
            //validar si hubo cambio de rol o terminal
            var activity = {idActivity: $scope.activity._id, eventCode: '10', eventName: 'closed'};
            activity.terminal = branchOffice.terminal;
            activity.role = role;
            Activity.activity.update(activity, function (data) {
                $scope.activity = data;
                socket.emit('selectionRole');
                redirectActivity(data);
            });

        }else{
            Activity.activity.save(adviserInfo, function (data) {
                console.log(data);
                $scope.activity = data;
                redirectActivity(data);
            }, function (err) {
                console.log(err);
            });
        }

    };

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

(function () {
'use strict';

angular
  .module('flugel.components.sidenav', [])
  .directive('fgSidenav', fgSidenavDirective);

  function fgSidenavDirective() {
    return {
      retrict: 'E',
      scope: {
      },
      controller: sideNavCtrl,
      templateUrl: 'src/components/sidenav/sidenav.html'
    };
  }

  sideNavCtrl.$inject = ['$scope', '$element','$attrs', 'BranchOffice'];
  function sideNavCtrl($scope, $element, $attrs, BranchOffice) {
      $scope.branchOfficeList = [];
      BranchOffice.branchOfficeList.query(function (data) {
          $scope.branchOffices = data;
          console.log(data);
      }, function (err) {
          console.log(err);
      });
  }
})();

(function () {
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
      templateUrl: 'src/components/tokenManagement/tokenManagement.html'
    };
  }

  tokenManagementCtrl.$inject = ['$scope', '$element','$attrs', '$interval', '$mdDialog', '$cookies', '$window', 'Token', 'Config', 'Login', 'Activity', 'socket'];
  function tokenManagementCtrl($scope, $element, $attrs, $interval, $mdDialog, $cookies, $window, Token, Config, Login, Activity, socket) {
    var stopTime,
        callTime,
        availableTime,
        room;

    var adviserInfo = {};

    var self = this;

    self.hidden = false;
    self.direction = 'up';
    self.onlyRead = $attrs.onlyRead === 'true' ? true : false;
    self.stateAttention = 0; // 0 = available, 1 = calling, 2 = in attention
    self.tokenToBeTaken = {};
    self.tokenInAttention = {};
    self.items = [
        {name: "Nuevo servicio", icon: "fa-plus", direction: "left" },
        {name: "Tranferir turno", icon: "fa-exchange", direction: "left" },
        {name: "Terminar turno", icon: "fa-power-off", direction: "left", btnColor: "md-warn"}
    ];

    $scope.attentionTime = "00:00:00";
    $scope.waitTime = "00:00:00";
    $scope.callTime = "00:00:00";
    $scope.availableTime = "00:00:00";
    $scope.stateName = ['Disponible', 'Llamando...'];
    $scope.visibleTooltip = true;
    $scope.activity = {};

    $scope.takeToken = takeToken;
    $scope.tokenAction = tokenAction;
    $scope.editService = editService;
    $scope.closeAttention = closeAttention;

    inicializeAttending();

    // valida que se esté atendiendo un turno
    function inicializeAttending() {
        getAdviserInfo(function () {
            checkIfAttending();
        });
    }

    function getAdviserInfo(callback) {
        Login.login.get(function (session) {
            if (session.login) {
                room = session.userData.circleList.branchOffices[0].posCode;
                inicializeSocket(room);
                adviserInfo = {
                      adviserName: session.userData.name,
                      adviserLastName: session.userData.lastName,
                      adviserId: session.userData.idUser,
                      adviserEmail: session.userData.email
                };
                Activity.activity.get(adviserInfo, function (data) {
                    $scope.activity = data;
                    return callback();
                });
            }
        });
    }
    function checkIfAttending(){
      Token.tokens.query({state: 2}, function (data) {
          if (data.length) {
              // Cambiar esto ******* del receiverAdviser
              self.tokenInAttention =  _.find(data, function (obj) {return  obj.token.receiverAdviser.adviserId === adviserInfo.adviserId;}) || {};
              console.log(self.tokenInAttention);
              if (_.size(self.tokenInAttention)) {
                  self.stateAttention = 2;
                  $scope.waitTime = diffTime(self.tokenInAttention.token.infoToken.logCreationToken, self.tokenInAttention.token.infoToken.logCalledToken);
                  $scope.callTime = diffTime(self.tokenInAttention.token.infoToken.logCalledToken, self.tokenInAttention.token.infoToken.logAtentionToken);
                  stopTime = $interval(callAtInterval, 200, false);
                  return;
              }
          }
          callToken();
      });
    }

    function inicializeSocket() {
        socket.on('newToken', function (data) {
            console.log(data);
            if (self.stateAttention === 0 && adviserInfo.adviserId === data.availableUser.adviserId) {
                getPendingToken(data.token);
            }
        });
        socket.on('resultService', function (data) {
            self.tokenInAttention = data;
            $mdDialog.hide();
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
        self.stateAttention = 0; // 0 = pending, 1 = calling, 2 = in attention, 3 = closed, 4 = abandoned, 5 = canceled
        self.tokenToBeTaken = {};
        self.tokenInAttention = {};

         // *** Punto 1 ***
        setEventActivity('3', 'available', function (data) {
              var activityStartTime = _.last($scope.activity.activity).activityStartTime;
              $interval.cancel(availableTime);
              availableTime = $interval(function () {
                  $scope.availableTime = diffTime(activityStartTime, false);
              }, 200, false);
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

    function callToken() {
        Token.tokens.query({state: 0, room: room}, function (data) {
            if (data.length) return getPendingToken(data[0]);  // Hay turnos Disponibles?
            available();
        });
    }

    function getPendingToken(token) {
        $interval.cancel(availableTime);
        var id = {id : token._id};

        // turno que ya se está llamando...
        if (token.token.infoToken.logCalledToken) {
            setTokenToBeTaken(token);
        }else{
            // Nuevo turno a llamar
            Token.callToken.update(id, function (tokenCalled) {
                setEventActivity('1', 'callToken'); // *** Punto 2 *** (update calling )Pending
                setTokenToBeTaken(tokenCalled);
            });
        }
        // Llama turno.
        function setTokenToBeTaken(token) {
            self.stateAttention = 1;
            self.tokenToBeTaken = token.token;
            self.tokenToBeTaken.id = token._id;
            callTime = $interval(function() {
                $scope.callTime = diffTime(token.token.infoToken.logCalledToken, false);
                if ($scope.callTime[4] >= 2) { //tiempo en minutos
                    Token.abandoningToken.update({id: token._id}, function (data) {
                        $interval.cancel(callTime);
                        callToken();
                    });
                }
            }, 200, false);
        }
    }

    function takeToken() {
        var id = {id : self.tokenToBeTaken.id};
        console.log(adviserInfo);
        Token.takeToken.update(id, adviserInfo, function (data) {
            // *** Punto 3 (update attendToken) ***
            setEventActivity('2', 'attendToken');
            self.stateAttention = 2;
            self.tokenInAttention = data;
            $scope.waitTime = diffTime(self.tokenInAttention.token.infoToken.logCreationToken, self.tokenInAttention.token.infoToken.logCalledToken);
            $scope.callTime = diffTime(self.tokenInAttention.token.infoToken.logCalledToken, self.tokenInAttention.token.infoToken.logAtentionToken);
            stopTime = $interval(callAtInterval, 200);
            $interval.cancel(callTime);
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
        }

        showDialog(locals, fnSuccess);
    }

    function closeAttention() {
        setEventActivity('10', 'closed', function (data) {
            socket.emit('closeAttention');
            $window.location = '#/select'; return;
        });
    }

    servicesCtrl.$inject = ['$scope', 'Token', '$mdDialog', 'Config', 'tokenData', 'mode', 'socket'];
    function servicesCtrl($scope, Token, $mdDialog, Config, tokenData, mode, socket) {
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

        $scope.insertService = function (serviceData, subService) {
            var service = _.clone(serviceData.service);
            service.subServices = [subService];

            if (mode === 'insert'  || mode === 'initInsert') {
                socket.emit('insertService', {id: tokenData.token._id, service: service});
            }else if (mode === 'edit') {
                //console.log(tokenData.service); //servicio actual del turno
                socket.emit('updateSubservice', {
                  idToken: tokenData.token._id,
                  idService: tokenData.service._id,
                  subServices: service.subServices
                });
            }

        };
    }

  }
})();

(function () {
'use strict';

angular
  .module('flugel.components.tokenScreen', [])
  .directive('fgTokenScreen', fgKeyboardDirective);

  function fgKeyboardDirective() {
    return {
      retrict: 'E',
      scope: {},
      controller: tokenScreenCtrl,
      templateUrl: 'src/components/tokenScreen/tokenScreen.html'
    };
  }
  tokenScreenCtrl.$inject = ['$scope', '$element','$attrs', 'Token', 'Config', 'socket'];
  function tokenScreenCtrl($scope, $element, $attrs, Token, Config, socket) {
      $scope.pendingTokens = [];

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

})();

(function () {
'use strict';

  angular.module('flugel.views.dash', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dash', {
      templateUrl: 'src/views/dashView/dash.html',
      controller: 'dashCtrl'
    }).when('/dash/:circleId', {
      templateUrl: 'src/views/dashView/dash.html',
      controller: 'dashCtrl'
    });
  }])

  .controller('dashCtrl', ['$scope', 'Login', '$window', '$cookies', '$mdSidenav', '$routeParams', 'Activity',
        function($scope, Login, $window, $cookies, $mdSidenav, $routeParams, Activity) {
      // Login.login.get(function (session) {
      //     if (!session.login) $window.location = '/login';
      // });
      $scope.adviserActivity = [];
      $scope.customerActivity = [];
      if ($routeParams.circleId) {
          Activity.activityGtr.get({room: $routeParams.circleId}, function (data) {
              $scope.advisersActivity = data.adviser;
              $scope.customersActivity = data.customer;
              console.log($scope.advisersActivity);
              console.log($scope.customersActivity);
              joinActivity($scope.advisersActivity, $scope.customersActivity);
          });
      }



      function joinActivity(adviserList, customerList) {
          console.log(customerList);
          console.log(adviserList);

          if (!_.size(customerList)) return console.log(adviserList);

          //filtar los clientes que no estan seiendo atendidos
          var customerListFilter = _.filter(customerList, function (customer) {
              return !_.isUndefined(customer.token.receiverAdviser);
          });
          // console.log(customerListFilter[0].token.receiverAdviser.adviserId);

          _.each(customerListFilter, function function_name(customerFilter) {
              console.log(customerFilter.token.receiverAdviser.adviserId);
          });
          // for ecach cada cliente
            // leer el asesor que atiende
            // y unir el cliente a ese asesor

          _.each(adviserList, function (adviser) {
              console.log(adviser);
          });
      }


      $scope.close = function () {
          $mdSidenav('left').toggle()
          .then(function () {
            console.log("close RIGHT is done");
          });
      };
  }]);

})();

(function () {
    'use strict';

    angular.module('flugel.views.selectionRole', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/select', {
        templateUrl: 'src/views/selectionRoleView/selectionRole.html',
        controller: 'selectionRoleCtrl'
      });
    }])

    .controller('selectionRoleCtrl', ['$scope', 'Login', '$window', '$cookies', function($scope, Login, $window, $cookies) {
        Login.login.get(function (session) {
            if (!session.login) $window.location = '/login';
        });

        $scope.logout = function(event) {
            event.preventDefault();
            Login.logout.save(function(session) {
                $cookies.remove('session');
                if (!session.login) $window.location = '/login';
            });
        };

    }]);
})();

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

    $scope.tokenGeneration = function () {
        console.log($scope.dataCustomer);
        Token.tokens.save($scope.dataCustomer.token, function (data) {
            console.log(data.token);
            $scope.generatedToken = data.token.token;
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
})();

(function () {
'use strict';

angular.module('flugel.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'src/views/view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', 'Login', '$window', '$cookies', function($scope, Login, $window, $cookies) {
    Login.login.get(function (session) {
        console.log(session);
        if (!session.login) $window.location = '/login';
    });
    $scope.logout = function(event) {
        event.preventDefault();
        Login.logout.save(function(session) {
            $cookies.remove('session');
            if (!session.login) $window.location = '/login';
        });
    };
}]);
})();

(function () {
		'use strict';
		angular.module('flugel.services', ['ngResource'])

		.factory('Config', function () {
			return {
					version : '0.0.1',
					ip: location.hostname,
					port: 3001,
		      protocol: 'http',
					origin: location.origin
			};
		})
		.factory('Token',['$resource', 'Config', function ContenidoFactory($resource, Config){
			return {
				services : $resource('http://' + Config.ip + ':' + Config.port + '/services'),
				tokens : $resource('http://' + Config.ip + ':' + Config.port + '/tokens'),
				callToken : $resource('http://' + Config.ip + ':' + Config.port + '/callToken', {}, { update: {method: 'PUT'}}),
				takeToken : $resource('http://' + Config.ip + ':' + Config.port + '/takeToken', {}, { update: {method: 'PUT'}}),
				closeToken : $resource('http://' + Config.ip + ':' + Config.port + '/closeToken', {}, { update: {method: 'PUT'}}),
				abandoningToken : $resource('http://' + Config.ip + ':' + Config.port + '/abandoningToken', {}, { update: {method: 'PUT'}})
			};
		}])
		.factory('Login',['$resource', 'Config', function ContenidoFactory($resource, Config){
			return {
					login : $resource('http://' + Config.ip + ':' + Config.port + '/user/login.json', {}, { update: {method: 'PUT'}}),
					logout : $resource('http://' + Config.ip + ':' + Config.port + '/user/logout.json', {}, { update: {method: 'PUT'}})
			};
		}])
		.factory('Activity',['$resource', 'Config', function ContenidoFactory($resource, Config){
			return {
					activity : $resource('http://' + Config.ip + ':' + Config.port + '/activity', {}, { update: {method: 'PUT'}}),
					activityGtr : $resource('http://' + Config.ip + ':' + Config.port + '/activityGtr', {}, { update: {method: 'PUT'}})
			};
		}])
		.factory('BranchOffice', ['$resource', 'Config', function ContenidoFactory($resource, Config) {
			return {
					branchOfficeList : $resource('http://' + Config.ip + ':' + Config.port + '/branchOffice', {}, { update: {method: 'PUT'}})
			};
		}])

		.factory('socket', ['$rootScope', 'Config', function ($rootScope, Config) {
			  //var socket = io.connect();
				var socket = io(Config.protocol + '://' + Config.ip + ':' + Config.port);
			  return {
				    on: function (eventName, callback) {
					      socket.on(eventName, function () {
						        var args = arguments;
						        $rootScope.$apply(function () {
						          	callback.apply(socket, args);
						        });
					      });
				    },
				    emit: function (eventName, data, callback) {
					      socket.emit(eventName, data, function () {
						        var args = arguments;
						        $rootScope.$apply(function () {
							          if (callback) {
							            callback.apply(socket, args);
							          }
						        });
					      });
				    }
		  };
		}]);
})();

(function () {
  'use strict';

  angular
    .module('flugel.components.charts.bar', [])
    .directive('fgChartBar', fgChartBarDirective);

    function fgChartBarDirective() {
      return {
        retrict: 'A',
        scope: {
        },
        controller: chartBarCtrl,
        template: '<div class="ct-chart" id="{{barId}}"></div>'
      };
    }
    chartBarCtrl.$inject = ['$scope', '$element', '$attrs'];
    function chartBarCtrl($scope, $element, $attrs) {

      $scope.barId = $attrs.id;
      var data = {
          labels: ['Disponible', 'Ocupado', 'Breack', 'Alm', 'Cap'],
          series: [
            [50, 14, 32, 7, 5]
          ]
      };

      var options = {
          seriesBarDistance: 2
      };

      var responsiveOptions = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                  return value[0];
              }
            }
          }]
      ];

      new Chartist.Bar('#'+$attrs.id, data, options, responsiveOptions)
      .on('draw', function(data) {
          if(data.type === 'bar') data.element.attr({style: 'stroke-width: '+ $attrs.ancho});
      });
    }
})();

(function () {
    'use strict';

    angular
      .module('flugel.components.charts.line', [])
      .directive('fgChartLine', fgChartLineDirective);

      function fgChartLineDirective() {
        return {
          retrict: 'A',
          scope: {
          },
          controller: chartLineCtrl,
          template: '<div class="ct-chart" id="{{lineId}}"></div>'
        };
      }
      chartLineCtrl.$inject = ['$scope', '$element', '$attrs'];
      function chartLineCtrl($scope, $element, $attrs) {
          var data = {
              labels: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30'],
              series: [
                  {
                    name: 'NS',
                    data: [100, 60, 83, 75, 90, 88]
                  },
                  {
                    name: 'NS Acumulado',
                    data: [100, 83, 85, 70, 60, 86]
                  }
              ]
            };
          $scope.lineId = $attrs.id;

          new Chartist.Line('#'+$attrs.id, data, {
            plugins: [
              Chartist.plugins.ctPointLabels({
                textAnchor: 'middle'
              }),
              // Chartist.plugins.tooltip()
            ]
          });

      }
})();

(function () {
'use strict';

angular
  .module('flugel.components.charts.pie', [])
  .directive('fgChartPie', fgChartBarDirective);

  function fgChartBarDirective() {
    return {
      retrict: 'A',
      scope: {
      },
      controller: chartPieCtrl,
      template: '<div class="ct-chart" id="{{pieId}}"></div>'
    };
  }
  
  chartPieCtrl.$inject = ['$scope', '$element', '$attrs'];
  function chartPieCtrl($scope, $element, $attrs) {
    $scope.pieId = $attrs.id;

    var data = {
        labels: ['Bananas', 'Apples', 'Grapes'],
        series: [20, 15, 40]
    };

    var options = {
        labelInterpolationFnc: function(value) {
            return value[0];
        }
    };

    var responsiveOptions = [
        ['screen and (min-width: 640px)', {
            chartPadding: 30,
            labelOffset: 100,
            labelDirection: 'explode',
            labelInterpolationFnc: function(value) {
              return value;
            }
        }],
        ['screen and (min-width: 1024px)', {
            labelOffset: 80,
            chartPadding: 20
        }]
    ];

    new Chartist.Pie('#'+$attrs.id, data, options, responsiveOptions);
  }
})();

(function () {
'use strict';

angular
  .module('flugel.components.gtr.activityAdviser', [])
  .directive('fgActivityAdviser', fgActivityAdviserDirective);

  function fgActivityAdviserDirective() {
    return {
      retrict: 'E',
      scope: {
          adviserActivity : '='
      },
      controller: activityAdviserCtrl,
      templateUrl: 'src/components/gtr/activityAdviser/activityAdviser.html'
    };
  }

  activityAdviserCtrl.$inject = ['$scope', '$element','$attrs', 'Activity', '$routeParams'];
  function activityAdviserCtrl($scope, $element, $attrs, Activity, $routeParams) {
      console.log($scope.adviserActivity);
  }
})();

(function () {
'use strict';

angular
  .module('flugel.components.gtr.header', [])
  .directive('fgHeader', fgHeaderDirective);

  function fgHeaderDirective() {
    return {
      retrict: 'E',
      scope: {
      },
      controller: headerCtrl,
      templateUrl: 'src/components/gtr/header/header.html'
    };
  }

  headerCtrl.$inject = ['$scope', '$element','$attrs'];
  function headerCtrl($scope, $element, $attrs) {

  }
})();
