'use strict';

angular
    .module('MainApplicationModule')
    .service('queryService', function($http) {

        function query(target, soql) {
            return $http({
                url: '/query',
                method: 'POST',
                data: {
                  'target' : target,
                  'soql' : soql
                }
            });
        }

        return {
            query : query
        };

    });
