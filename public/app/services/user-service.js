'use strict';

angular
    .module('MainApplicationModule')
    .service('userService', function($http) {

        function login(user, local) {
            return $http({
                url: local ? '/user/login' : '/user/authenticate',
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
            loadUsers : all,
            authenticateUser: get,
            registerUser: create,
            login: login
        };

    });
