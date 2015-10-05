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
.factory('Login',['$resource', 'Config', function ContenidoFactory($resource, Config){
	return {
		login : $resource('http://' + Config.ip + ':' + Config.port + '/user/login.json', {}, { update: {method: 'PUT'}})
	};
}]);
