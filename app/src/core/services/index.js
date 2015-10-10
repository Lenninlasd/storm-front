'use strict';
angular.module('flugel.services', ['ngResource'])

.factory('Config', function () {
	return {
			version : '0.0.1',
			ip: location.hostname,
			port: 5000,
      protocol: 'http'
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
}]);
