'use strict';

angular
    .module('MainApplicationModule')
    .controller('HomeController', ['$scope', '$rootScope', '$location', 'userService',
        function($scope, $rootScope, $location, userService) {

            $scope.users = [];

            function handleNotAuthenticated() {
                $location.path('/login');
            }

            function handleAuthenticated() {
                $location.path('/chart');
            }

            function initialize() {
                userService.authenticateUser().then(handleAuthenticated, handleNotAuthenticated);
            }

            initialize();

        }
    ]);
