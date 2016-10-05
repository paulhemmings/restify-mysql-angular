'use strict';

angular
    .module('MainApplicationModule')
    .factory('FacebookFactory', function() {

        // return a factory method
        // to call when the charting object is required

        return function() {
            return window.FB;
        };

    });
