'use strict';

angular
    .module('MainApplicationModule')
    .controller('ChartController', ['$scope', '$rootScope', '$location', 'ChartingService', 'userService', 'queryService',
        function($scope, $rootScope, $location, chartingService, userService, queryService) {

            $scope.users = [];

            function displayChart(queryData) {
                consooe.log(JSON.stringify(queryData));
                /*
                $scope.users = userData.users;
                var chartData = userData.users.map(function(row) {
                    return {
                        'name' : row.name,
                        'value' : row.age
                    }
                })
                chartingService.loadBarChart('mapContainer', chartData);
                */
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
