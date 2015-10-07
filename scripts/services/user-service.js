'use strict';

exports.name = 'UserService';

exports.initialize = function(database) {
    exports.all = function(user) {
        console.log('models', database);
        return database.models.User.findAll();
    };
};
