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
