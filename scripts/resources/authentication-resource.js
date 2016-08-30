'use strict';

exports.initialize = function(server, services) {

    // grab the services we need

    var salesforceService = services.SalesforceService;

    server.get('authenticate/login', function(req, res, next) {
        salesforceService.login(req.username, req.password).then(function(userInfo) {
            res.send(200, userInfo);
            next();
        }, function(error) {
            res.send(301, { 'error': error});
            next();
        });
    });

};
