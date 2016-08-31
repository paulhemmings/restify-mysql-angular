'use strict';

angular
    .module('MainApplicationModule')
    .controller('ChartController', ['$scope', '$rootScope', 'ChartingService', 'userManager',
        function($scope, $rootScope, chartingService, userManager) {

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

            function handleAuthentication() {
                if (userManager.isAuthenticated()) {
                    userManager.loadUsers().then(usersLoaded);
                } else {
                    $location.path('/login');
                }
            }

            function initialize() {
                userManager.authenticateUser().then(handleAuthentication);
            }

            initialize();

        }
    ]);
