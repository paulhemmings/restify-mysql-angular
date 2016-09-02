'use strict';

(function(exports) {

  var Promise = require('node-promise').Promise;

  exports.name = 'AuthenticationService';

  /*
   * Validate token
   */

  function tokenName() {
      return 'AuthenticationToken';
  }

  function retrieveToken(cryptoService, cookie) {
      return (!cookie) ? undefined : JSON.parse(cryptoService.decrypt(cookie));
  }

  function generateToken(cryptoService, user) {
      return cryptoService.encrypt(JSON.stringify(user));
  }

  /*
   * Authenticate request
   */

  exports.authenticateRequest = function(req, cookieService, cryptoService) {
      var promise = new Promise();
      var token = retrieveToken(cryptoService, cookieService.readCookie(req, tokenName()));

      if (!token || token.username === undefined) {
          promise.reject ('invalid token');
          return promise;
      }

      promise.resolve (token);
      return promise;
  };

  /*
   * Authenticate future responses
   */

  exports.authenticateResponse = function(res, user, cookieService, cryptoService) {
      var promise = new Promise();
      var token = generateToken(cryptoService, user);
      cookieService.writeCookie(res, tokenName(), token);

      promise.resolve(token);
      return promise;
  };

})(exports);
