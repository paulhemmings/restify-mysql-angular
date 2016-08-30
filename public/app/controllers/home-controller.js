'use strict';

angular
    .module('MainApplicationModule')
    .controller('HomeController', ['$scope', '$rootScope', 'ChartingService', 'userService',
        function($scope, $rootScope, chartingService, userService) {

            $scope.users = [];

            function displayUserChart(userData) {
                $scope.users = userData;
                var chartData = userData.map(function(row) {
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

            function onChartLoaded() {
                userService.all().then(usersLoaded);
            }

            function initialize() {
                $rootScope.$on('charting-event-loaded', onChartLoaded);
            }

            initialize();

        }
    ]);
