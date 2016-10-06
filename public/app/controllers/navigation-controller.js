'use strict';

angular
    .module('MainApplicationModule')
    .controller('NavigationController', ['$scope', '$rootScope', '$location', 'userService',
        function($scope, $rootScope, $location, userService) {

            $scope.options = [];
            $scope.isSelected = isSelected;
            $scope.userName = '';

            function buildOptions() {
                $scope.options.length = 0;
                $scope.options.push({ key:"Home", url:"#/welcome", selected : false });
                if ($scope.authenticatedUser.username) {
                  $scope.options.push({ key:"Logout", url:"#/logout", selected : false });
                } else {
                  $scope.options.push({ key:"Login", url:"#/login", selected : false });
                }
            }

            function isSelected(option) {
                return (document.URL.indexOf(option.url) > 0);
            }

            function handleNotAuthenticated() {
                $scope.authenticatedUser = {};
                return buildOptions();
            }

            function handleAuthenticated(response) {
                $scope.authenticatedUser = response.data || {};
                return buildOptions();
            }

            function initialize() {
                userService.authenticateUser().then(handleAuthenticated, handleNotAuthenticated);
            }

            initialize();

            /*
             * How do you unit test private methods?
             * Expose them via a 'test' property
             */

            $scope.__test__ = {
              initialize: initialize
            };

        }]);
