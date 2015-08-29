'use strict';

angular.module('flugel.version', [
  'flugel.version.interpolate-filter',
  'flugel.version.version-directive'
])

.value('version', '0.1');
