'use strict';

angular
    .module('MainApplicationModule')
    .service('queryService', function($http) {

        function query(query) {
            return $http({
                url: '/query',
                method: 'GET',
                params: query
            });
        }

        return {
            query : query
        };

    });
