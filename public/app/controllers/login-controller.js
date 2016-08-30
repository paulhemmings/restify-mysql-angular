'use strict';

angular
    .module('MainApplicationModule')
    .controller('LoginController', ['$scope', '$location', 'userService',
        function($scope, $location, userService) {

            $scope.login = login;
            $scope.create = create;

            function login(user) {
                userService.login(user).then(function(response) {
                    $location.path('/blogger');
                }, function(error) {
                    $scope.error = error.error;
                });
            }

            function create(user) {
                userService.create(user).then(function() {
                  $location.path('/blogger');
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
