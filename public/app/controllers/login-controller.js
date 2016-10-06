'use strict';

angular
    .module('MainApplicationModule')
    .controller('LoginController', ['$scope', '$rootScope', '$location', 'userService', 'FacebookFactory',
        function($scope, $rootScope, $location, userService, FacebookFactory) {

            $scope.login = login;
            $scope.create = create;

            function login(user, local) {
                userService.login(user, local).then(function(response) {
                    $location.path('/chart');
                }, function(error) {
                    $scope.error = error.error;
                });
            }

            function create(user) {
                userService.registerUser(user).then(function() {
                  $location.path('/chart');
                }, function(error) {
                    $scope.error = error.error;
                });
            }

            function initialize() {
                $rootScope.$on('facebook-sdk-event-loaded', function() {
                    /*
                    FacebookFactory().getLoginStatus(function(response) {
                      if (response.status === 'connected') {
                        console.log('Logged in.');
                      }
                      else {
                        FacebookFactory().login();
                      }
                    });
                    */
                });
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
