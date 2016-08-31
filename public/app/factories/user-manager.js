'use strict';

/*
 * User Model manager.
 */

angular
    .module('MainApplicationModule')
    .factory('userManager', [ '$http', '$q', 'userService', function($http, $q, userService) {

      var manager = {
        users: [],
        authenticated: null
      };

      manager.isAuthenticated = function() {
          return manager.authenticated != null;
      }

      manager.loadUsers = function() {
          var deferred = $q.defer();
          userService.all().then(function(response) {
              manager.users = response.data.users;
              deferred.resolve(response);
          }, function(error) {
              manager.users.length = 0;
              deferred.reject();
          });
          return deferred.promise;
      };

      manager.authenticateUser = function() {
          var deferred = $q.defer();
          userService.get().then(function(response) {
              manager.authenticated = response.data;
              deferred.resolve();
          }, function(error) {
              manager.authenticated = null;
              deferred.reject();
          });
          return deferred.promise;
      };

      return manager;

    }]);
