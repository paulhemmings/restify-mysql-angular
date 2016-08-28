'use strict';

angular
    .module('MainApplicationModule')
    .factory('ChartingFactory', function() {

        // return a factory method
        // to call when the charting object is required

        return function() {
            return window.d3;
        };

    });
