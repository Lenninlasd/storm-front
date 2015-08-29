'use strict';

describe('flugel.version module', function() {
  beforeEach(module('flugel.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
