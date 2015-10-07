'use strict';

angular
    .module('MainApplicationModule')
    .service('userService', function($http) {

        function getUsers() {
            return $http({
                url: '/users',
                method: 'GET'
            });
        }

        return {
            getUsers: getUsers
        };

    });
