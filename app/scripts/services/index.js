'use strict';
angular.module('flugel.services', ['ngResource'])

.factory('Config', function () {
	return {
			version : '0.2.2',
			ip: location.hostname,
			port: 5000,
      protocol: 'http'
	};
})
.factory('Turno',['$resource', 'Config', function ContenidoFactory($resource, Config){
	return {
		services : $resource('http://' + Config.ip + ':' + Config.port + '/services')
		// contenido : $resource('http://' + Config.ip + ':' + Config.port + '/' +  Config.version + '/docente/contenido.json', {}, { update: {method: 'PUT'}}),
		// calificaciones: $resource('http://' + Config.ip + ':' + Config.port + '/' +  Config.version + '/docente/calificaciones.json', {}, { update: {method: 'PUT'}}),
		// notas: $resource('http://' + Config.ip + ':' + Config.port + '/' + Config.version +'/docente/notas.json', {}, { update: {method: 'PUT'}}),
		// estudiantes: $resource('http://' + Config.ip + ':' + Config.port + '/' + Config.version +'/docente/estudiante.json', {}, { update: {method: 'PUT'}}),
		// asistencia: $resource('http://' + Config.ip + ':' + Config.port + '/' + Config.version + '/docente/asistencia.json')
	};
}]);
