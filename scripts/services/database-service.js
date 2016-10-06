
'use strict';

(function(exports) {

    var database = require( __dirname + '/../database/database');

    exports.name = 'DatabaseService';

    exports.initialize = function() {
    };

    exports.getDatabase = function() {
        return this.database;
    }

    exports.query = function(token, soql) {
        console.log('local query: ' + soql);
        var promise = new Promise();
        var records = [];
        this.database.query(soql, function(err, result) {
            if (err) {
                promise.reject ('invalid query: ' + err);
                return promise;
            }
            promise.resolve (result);
        });
        return promise;
    }

})(exports);
