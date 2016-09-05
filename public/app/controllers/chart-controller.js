'use strict';

angular
    .module('MainApplicationModule')
    .controller('ChartController', ['$scope', '$rootScope', '$location', 'ChartingService', 'userService', 'queryService',
        function($scope, $rootScope, $location, chartingService, userService, queryService) {

            $scope.users = [];
            $scope.query = querySoql;
            $scope.records = [];
            $scope.recordKeys = [];

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
                $scope.records = response.records;
                displayChart(response.data);
            }
            function handleTestResponse() {
                $scope.records = [
                    {
                        "attributes": {
                            "type":"Account","url":"/services/data/v29.0/sobjects/Account/0014B000006il6dQAA"
                        },
                        "Id":"0014B000006il6dQAA",
                        "Name":"John Smith"
                    }
                ];
                if ($scope.records && $scope.records.length > 0) {
                    $scope.recordKeys = Object.keys($scope.records[0]);
                }
            }

            function querySoql(soql) {
                queryService.query({
                    query : soql
                }).then(handleQueryResponse, handleTestResponse);
            }

            function handleNotAuthenticated() {
                $location.path('/login');
            }

            function handleAuthenticated() {
            }

            function initialize() {
                userService.authenticateUser().then(handleAuthenticated, handleNotAuthenticated);
            }

            initialize();

        }
    ]);
