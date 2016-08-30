'use strict';

angular
    .module('MainApplicationModule')
    .controller('NavigationController', ['$scope', '$rootScope', '$location', 'userManager',
        function($scope, $rootScope, $location, userManager) {

            $scope.options = [];
            $scope.isSelected = isSelected;

            function buildOptions(authenticated) {
                $scope.options.length = 0;
                $scope.options.push({ key:"Home", url:"#/welcome", selected : false });
                if (userManager.isAuthenticated()) {
                  $scope.options.push({ key:"Logout", url:"#/logout", selected : false });
                } else {
                  $scope.options.push({ key:"Login", url:"#/login", selected : false });
                }
            }

            function isSelected(option) {
                return (document.URL.indexOf(option.url) > 0);
            }

            function initialize() {
              userManager.authenticateUser().then(buildOptions);
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
