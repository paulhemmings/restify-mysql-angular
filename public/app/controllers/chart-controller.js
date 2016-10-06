'use strict';

angular
    .module('MainApplicationModule')
    .controller('ChartController', ['$scope', '$rootScope', '$location', 'ChartingService', 'userService', 'queryService',
        function($scope, $rootScope, $location, chartingService, userService, queryService) {

            $scope.authenticatedUser = {};
            $scope.query = querySoql;
            $scope.records = [];
            $scope.recordKeys = [];
            $scope.selectKey = selectKey;
            $scope.selectedKeys = [];
            $scope.chartData = [];
            $scope.queryTargets = queryTargets;
            $scope.isKeySelected = isKeySelected;
            $scope.isChartPopulated = isChartPopulated;

            function queryTargets() {
                return $scope.authenticatedUser.authenticatedBy || [];
            }

            function isKeySelected(key) {
                return $scope.selectedKeys.indexOf(key) !== -1;
            }

            function isChartPopulated() {
                return $scope.chartData && $scope.chartData.length > 0;
            }

            function selectKey(key) {
                var index = $scope.selectedKeys.indexOf(key);
                if (index === -1) {
                    $scope.chartData.length = 0;
                    $scope.selectedKeys.push(key);
                } else {
                    $scope.chartData.length = 0;
                    $scope.selectedKeys.splice(index, 1);
                }
                if ($scope.selectedKeys.length == 2) {
                    $scope.chartData = buildChartData($scope.records, $scope.selectedKeys);
                    chartingService.emptyChart();
                    chartingService.loadBarChart('mapContainer', $scope.chartData);
                }
                return !(index === -1);
            }

            function buildChartData(queryData, queryKeys) {
                return queryData.map(function(row) {
                    return {
                        'name' : row[queryKeys[0]],
                        'value' : row[queryKeys[1]],
                    }
                });
            }

            function handleQueryResponse(response) {
                $scope.records = response.data.records;
                if ($scope.records && $scope.records.length > 0) {
                    $scope.recordKeys = Object.keys($scope.records[0]);
                    $scope.recordKeys.splice($scope.recordKeys.indexOf('attributes'), 1);
                    $scope.selectedKeys.length = 0;
                    $scope.chartData.length = 0;
                }
            }

            function handleErrorResponse(response) {
                $scope.records = [
                    {
                        "error": response.data.error
                    }
                ];
                $scope.recordKeys = Object.keys($scope.records[0]);
                $scope.selectedKeys.length = 0;
                $scope.chartData.length = 0;
            }

            function querySoql(target, soql) {
                queryService.query(target, soql).then(handleQueryResponse, handleErrorResponse);
            }

            function handleNotAuthenticated() {
                $location.path('/login');
            }

            function handleAuthenticated(response) {
                $scope.authenticatedUser = response.data;
            }

            function initialize() {
                userService.authenticateUser().then(handleAuthenticated, handleNotAuthenticated);
            }

            initialize();

        }
    ]);
