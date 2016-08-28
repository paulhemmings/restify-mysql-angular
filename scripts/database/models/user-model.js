var Sequelize = require('Sequelize');

exports.initialize = function(sequelize, models) {

    models.User = sequelize.define('user', {
        name: {
          type: Sequelize.STRING,
          field: 'fullName'
        },
        age: {
          type: Sequelize.INTEGER,
          field: 'age'
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

};
