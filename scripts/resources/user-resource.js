'use strict';

exports.initialize = function(server, services) {

  // grab the services we need

  var userService = services.UserService,
      authService = services.AuthenticationService,
      cookieService = services.CookieService,
      cryptoService = services.CryptoService,
      salesforceService = services.SalesforceService,
      databaseService = services.DatabaseService;

  /*
   * Middleware
   */

  var authenticateRequestHandler = function(req, res, next) {
      console.log('authenticateRequestHandler');
      authService.authenticateRequest(req, cookieService, cryptoService).then(
          function(token) {
              // add token to request
              req.token = token;
              next();
          },
          function(error) {
              // failed to authenticate
              res.send(301, { 'error': error});
              // call next handler (tell it not to fire)
              next(false);
          }
      );
  }

  var authenticateResponseHandler = function(req, res, next) {
      console.log('authenticateResponseHandler');
      // check token added to request
      if (req.token) {
          console.log('generate token in response based on token ' + req.token);
          authService.authenticateResponse(res, req.token, cookieService, cryptoService);
      }
      // call next handler in chain
      next();
  }

  var salesforceLoginHandler = function(req, res, next) {
      console.log('salesforceLoginHandler');
      salesforceService.login(req.body.username, req.body.password, req.body.securityToken).then(function(token) {
          // add token to request (for later)
          req.token = token;
          next();
      }, function(error) {
          res.send(301, { 'error': error});
          next(false);
      });
  }

  var localLoginHandler = function(req, res, next) {
      console.log('localLoginHandler');
      userService.login(databaseService, cryptoService, req.body.username, req.body.password).then(function(user) {
          // add token to request
          req.token = { 'username' : user.username };
          next();
      }, function(error) {
          res.send(401, { 'error': error});
          next(false);
      });
  }

  var createUserHandler = function(req, res, next) {
      console.log('createUserHandler');
      userService.persist(databaseService, cryptoService, req.body).then(function(user) {
          // add token to request
          req.token = { 'username' : user.username };
          next();
      }, function(error) {
          res.send(401, { 'error: ': error});
          next(false);
      });
  }

  var validateUserHandler = function(req, res, next) {
      console.log('validateUserHandler');

      // check token already added to request
      if (!req.token) {
          // failed to authenticate
          res.send(301, { 'error': error});
          // call next handler (tell it not to fire)
          next();
          return;
      }

      // remote
      if (req.token.accessToken && req.token.accessToken.length > 0) {
          res.send(200, { 'username' : req.token.username, 'authenticatedBy' : ['local', req.token.authenticationService] });
          next();
          return;
      }

      // local
      userService.find(databaseService, {'username' : req.token.username}).then(function(user) {
        res.send(200, { 'username' : user[0].username, 'authenticatedBy' : ['local'] });
        next();
      }, function(error) {
          res.send(401, { 'error': 'invalid user: ' + error});
          next();
      });
  }

  /*
   * Add resource end points
   */

   server.post('user/authenticate', salesforceLoginHandler, authenticateResponseHandler, (req, res, next) => {
       res.send(200, { 'username' : req.token.username, 'authenticatedBy' : ['local', req.token.authenticationService] });
       next();
   });
   server.post('/user/login', localLoginHandler, authenticateResponseHandler, (req,res,next) => {
       res.send(200, { 'username' : req.token.username, 'authenticatedBy' : ['local'] });
       next();
   });
   server.post('/user', createUserHandler, authenticateResponseHandler, (req, res, next) => {
       res.send(200, { 'username' : req.token.username });
       next();
   });
   server.get('/user', authenticateRequestHandler, validateUserHandler);

};
