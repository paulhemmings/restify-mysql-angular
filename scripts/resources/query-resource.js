'use strict';

exports.initialize = function(server, services) {

  // grab the services we need

    var userService = services.UserService,
        authService = services.AuthenticationService,
        cookieService = services.CookieService,
        cryptoService = services.CryptoService,
        salesforceService = services.SalesforceService;

    server.post('/query', function(req, res, next) {
      authService.authenticateRequest(req, cookieService, cryptoService).then(function(token) {
          console.log('query Sf: ' + req.body.soql);
          salesforceService.query(token, req.body.soql).then(function(response) {
            res.send(200, response);
            next();
          }, function(error) {
              res.send(401, { 'error': 'query failed:' + error});
              next();
          });
      }, function(error) {
          res.send(401, { 'error': 'invalid token:' + error});
          next();
      });
    });

};
