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
             if (!users || users.length === 0) {
                 return promise.reject ('no user found');
             }
             promise.resolve (users);
        });
        return promise;
     }

    exports.find = findUser;

    exports.login = function(databaseService, cryptoService, username, password) {
        var promise = new Promise();
        findUser(databaseService, {
            'username': username
        }).then(function(users) {
            if (!users || users.length === 0) {
                promise.reject ('no user found');
            } else if (users[0].password !== cryptoService.encryptWithSalt(password, users[0].salt).passwordHash ) {
                promise.reject ('user found - invalid password');
            } else {
                promise.resolve (users[0]);
            }
        }, function(error) {
            promise.reject ('no user found');
        });
        return promise;
      //
    //   return findUser(databaseService, {
    //       'username': username,
    //       'password': cryptoService.encrypt(password)
    //     });
    };

    exports.all = function(databaseService) {
      	return databaseService.models.User.findAll();
    };

    exports.persist = function(databaseService, cryptoService, model) {
        var promise = new Promise();

        // check if existing
        if (model._id) {
            promise.reject ('cannot yet edit existing user');
            return promise;
        }

        // encrypt the password (if local and not via remote authentication)
        if (model.password) {
            var passwordAndSalt = cryptoService.encryptWithSalt(model.password);
            model.password = passwordAndSalt.passwordHash;
            model.salt = passwordAndSalt.salt;
        }

        // persist
        console.log('storing new user: ' + JSON.stringify(model));
        databaseService.models.User.create(model).then(function(persisted) {
            promise.resolve(persisted.get({
                plain: true
            }));
        });

        return promise;
    };

})(exports);
