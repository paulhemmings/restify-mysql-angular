'use strict';

angular
    .module('MainApplicationModule')
    .controller('ChartController', ['$scope', '$rootScope', '$location', 'ChartingService', 'userService', 'queryService',
        function($scope, $rootScope, $location, chartingService, userService, queryService) {

            $scope.users = [];
            $scope.query = querySoql;
            $scope.records = [];
            $scope.recordKeys = [];
            $scope.selectKey = selectKey;
            $scope.selectedKeys = [];
            $scope.isKeySelected = isKeySelected;

            function isKeySelected(key) {
                return $scope.selectedKeys.indexOf(key) !== -1;
            }

            function selectKey(key) {
                var index = $scope.selectedKeys.indexOf(key);
                if (index === -1) {
                    $scope.selectedKeys.push(key);
                } else {
                    $scope.selectedKeys.splice(index, 1);
                }
                if ($scope.selectedKeys.length == 2) {
                    displayChart($scope.records, $scope.selectedKeys);
                }
                return !(index === -1);
            }

            function displayChart(queryData, queryKeys) {
                var chartData = queryData.map(function(row) {
                    return {
                        'name' : row[queryKeys[0]],
                        'value' : row[queryKeys[1]],
                    }
                })
                chartingService.loadBarChart('mapContainer', chartData);
            }

            function handleQueryResponse(response) {
                $scope.records = response.data.records;
                if ($scope.records && $scope.records.length > 0) {
                    $scope.recordKeys = Object.keys($scope.records[0]);
                }
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
