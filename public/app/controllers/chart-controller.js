'use strict';

angular
    .module('MainApplicationModule')
    .controller('ChartController', ['$scope', '$rootScope', '$location', 'ChartingService', 'userService', 'queryService',
        function($scope, $rootScope, $location, chartingService, userService, queryService) {

            $scope.users = [];

            function displayChart(queryData) {
                var chartData = queryData.records.map(function(row) {
                    return {
                        'name' : row.Name,
                        'value' : row.Total_Lifetime_Value__pc
                    }
                })
                chartingService.loadBarChart('mapContainer', chartData);
            }

            function handleQueryResponse(response) {
                displayChart(response.data);
            }

            function handleNotAuthenticated() {
                $location.path('/login');
            }

            function handleAuthenticated() {
                queryService.query({
                    query : 'SELECT ID FROM ACCOUNT LIMIT 1'
                }).then(handleQueryResponse);
            }

            function initialize() {
                userService.authenticateUser().then(handleAuthenticated, handleNotAuthenticated);
            }

            initialize();

        }
    ]);
