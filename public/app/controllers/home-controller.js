'use strict';

angular
    .module('MainApplicationModule')
    .controller('HomeController', ['$scope', '$rootScope', '$location', 'userManager',
        function($scope, $rootScope, $location, userManager) {

            $scope.users = [];

            function handleNotAuthenticated() {
                $location.path('/login');
            }

            function handleAuthenticated() {
                $location.path('/chart');
            }

            function initialize() {
                userManager.authenticateUser().then(handleAuthenticated, handleNotAuthenticated);
            }

            initialize();

        }
    ]);
