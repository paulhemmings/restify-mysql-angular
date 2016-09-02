'use strict';

angular
    .module('MainApplicationModule')
    .controller('LoginController', ['$scope', '$location', 'userService',
        function($scope, $location, userService) {

            $scope.login = login;
            $scope.authenticate = authenticate;
            $scope.create = create;

            function authenticate(user) {
                userService.authenticate(user).then(function(response) {
                    $location.path('/chart');
                }, function(error) {
                    $scope.error = error.error;
                });
            }

            function login(user) {
                userService.login(user).then(function(response) {
                    $location.path('/chart');
                }, function(error) {
                    $scope.error = error.error;
                });
            }

            function create(user) {
                userService.create(user).then(function() {
                  $location.path('/chart');
                }, function(error) {
                    $scope.error = error.error;
                });
            }

            function initialize() {
                // none required
            }

            initialize();

            /*
             * How do you unit test private methods?
             * Expose them via a 'test' property
             */

            $scope.__test__ = {
              initialize: initialize
            };

        }]);
