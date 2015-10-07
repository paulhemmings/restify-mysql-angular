'use strict';

angular
    .module('MainApplicationModule')
    .controller('HomeController', ['$scope', 'userService',
        function($scope, userService) {

            $scope.users = [];

            function loadUsers(response) {
                $scope.users = response.data;
            }

            function initialize() {
                userService.getUsers().then(loadUsers);
            }

            initialize();

        }
    ]);
