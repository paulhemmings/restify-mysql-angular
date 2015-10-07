'use strict';

exports.initialize = function(server, services) {

    // grab the services we need

    var userService = services.UserService;

    server.get('/users', function(req, res, next) {
        userService.all().then(function(users) {
            res.send(200, users);
            next();
        }, function(error) {
            res.send(301, { 'error': error});
            next();
        });
    });

};
