
'use strict';

(function(exports) {

    var Sequelize = require('Sequelize'),
        fs = require('fs'),
        seql = null,
        models = {},
        modelsPath = __dirname + '/../database/models';


    exports.name = 'DatabaseService';

    exports.initialize = function() {

        // bootstrap connections.

        console.log('connect to db');
        seql = new Sequelize('testDatabase', 'testUser', 'testPassword', {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
              max: 5,
              min: 0,
              idle: 10000
            }
        });

        // bootstrap models

        fs.readdirSync(modelsPath).forEach(function(file) {
            console.log('load model ' + file);
            var model = require(modelsPath + '/' + file);
            model.initialize(seql, models);
        });

        // export models

        exports.models = models;

        // export  Sequelize for raw queries only
        // exports.sequelize = seql;

    };

    exports.getDatabase = function() {
        return this.database;
    }

    exports.query = function(token, soql) {
        // console.log('local query: ' + soql);
        // console.log('seql' , seql);
        return seql.query(soql, { type: seql.QueryTypes.SELECT});
    }

})(exports);
