
'use strict';

(function(exports) {

    var database = require( __dirname + '/../database/database');

    exports.getDatabase = function() {
        return this.database;
    }

})(exports);
