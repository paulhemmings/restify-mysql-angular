'use strict';

angular
    .module('MainApplicationModule')
    .service('userService', function($http) {

        function login(user) {
            return $http({
                url: '/user/login',
                method: 'POST',
                data: user
            });
        }

        function create(user) {
            return $http({
                url: '/user',
                method: 'POST',
                data: user
            });
        }

        function get() {
            return $http({
                url: '/user',
                method: 'GET'
            });
        }

        function all() {
          return $http({
              url: '/users',
              method: 'GET'
          });
        }

        return {
            login: login,
            create: create,
            get: get,
            all: all
        };

    });
