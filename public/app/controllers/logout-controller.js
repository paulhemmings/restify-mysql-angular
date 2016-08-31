'use strict';

angular
    .module('MainApplicationModule')
    .controller('LogoutController', ['$scope', '$rootScope', '$location', '$cookies',
        function($scope, $rootScope, $location, $cookies) {

            $scope.logout = logout;

            function logout() {
                // delete the cookie.
                delete $cookies.AuthenticationToken;
                // redirect to home page
                $location.path('/home');
            }

            function initialize() {
            }

            initialize();

            /*
             * How do you unit test private methods?
             * Expose them via a 'test' property
             */

            $scope.__test__ = {
              logout: logout
            };

        }]);
