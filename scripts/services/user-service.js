'use strict';

(function(exports) {

    exports.name = 'UserService';

    exports.initialize = function() {
    };

    var Promise = require('node-promise').Promise,
        curry = require('curry');
        // database = require( __dirname + '/../database/database');

    var handler = curry(function(promise, err, response) {
        if(err) {
            console.log('saving failed with ', err);
            return promise.reject (err);
        }
        promise.resolve (response);
    });

    /*
     * Find user with matching username and password,
     * Return that user object
     */

     function findUser (databaseService, filter) {
         console.log('find user ' + JSON.stringify(filter));
         var promise = new Promise();
       	 databaseService.models.User.findAll({
             where : filter
         }).then(function(users) {

            console.log('returned user ' + JSON.stringify(users));

             if (!users || users.length === 0) {
                 return promise.reject ('no user found');
             }

             console.log('found users: ' + users.length);
             promise.resolve (users[0]);

        });
        return promise;
     }

    exports.find = findUser;

    exports.login = function(databaseService, cryptoService, username, password) {
      return findUser({
          'username': username,
          'password': cryptoService.encrypt(password)
        });
    };

    exports.all = function(databaseService) {
      	return databaseService.models.User.findAll();
    };

    exports.persist = function(cryptoService, model) {
        var promise = new Promise();

        // check if existing

        if (model._id) {
            promise.reject ('cannot yet edit existing user');
            return promise;
        }

        // encrypt the password (if local and not via remote authentication)
        if (model.password) {
            model.password = cryptoService.encrypt(model.password);
        }

        // persist
        databaseService.models.User.create(model).then(function(jane) {
            promise.resolve(jane.get({
                plain: true
            }));
        });

        return promise;
    };

})(exports);
