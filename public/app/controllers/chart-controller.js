'use strict';

angular
    .module('MainApplicationModule')
    .controller('ChartController', ['$scope', '$rootScope', 'ChartingService', 'userService',
        function($scope, $rootScope, chartingService, userService) {

            $scope.users = [];

            function displayUserChart(userData) {
                $scope.users = userData.users;
                var chartData = userData.users.map(function(row) {
                    return {
                        'name' : row.name,
                        'value' : row.age
                    }
                })
                chartingService.loadBarChart('mapContainer', chartData);
            }

            function usersLoaded(response) {
                displayUserChart(response.data);
            }

            function handleNotAuthenticated() {
                $location.path('/login');
            }

            function handleAuthenticated() {
                userService.loadUsers().then(usersLoaded);
            }

            function initialize() {
                userService.authenticateUser().then(handleAuthenticated, handleNotAuthenticated);
            }

            initialize();

        }
    ]);
