'use strict';

var Sequelize = require('Sequelize'),
    fs = require('fs');

// bootstrap connections.

console.log('connect to db');
var sequelize = new Sequelize('testDatabase', 'testUser', 'testPassword', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
});

// bootstrap models

var models = {};
var modelsPath = __dirname + '/models';
fs.readdirSync(modelsPath).forEach(function(file) {
    console.log('load model ' + file);
    var model = require(modelsPath + '/' + file);
    model.initialize(sequelize, models);
});

// export models

exports.models = models;
