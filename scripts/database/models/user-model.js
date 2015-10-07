var Sequelize = require('Sequelize');

exports.initialize = function(sequelize, models) {

    models.User = sequelize.define('user', {
        name: {
          type: Sequelize.STRING,
          field: 'fullName'
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

};
