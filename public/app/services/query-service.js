'use strict';

angular
    .module('MainApplicationModule')
    .service('queryService', function($http) {

        function query(soql) {
            return $http({
                url: '/query',
                method: 'POST',
                data: { 'soql' : soql }
            });
        }

        return {
            query : query
        };

    });
