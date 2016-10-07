var Sequelize = require('Sequelize');

exports.initialize = function(sequelize, models) {

    models.User = sequelize.define('UserRecord', {
        name: {
            type: Sequelize.STRING,
            field: 'fullName'
        },
        age: {
            type: Sequelize.INTEGER,
            field: 'age'
        },
        username: {
            type: Sequelize.STRING,
            field: 'username'
        },
        password: {
            type: Sequelize.STRING,
            field: 'password'
        },
        salt: {
            type: Sequelize.STRING,
            field: 'salt'
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

};
