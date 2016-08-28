'use strict';

angular.module('MainApplicationModule')
    .provider('ChartingProvider', function () {
    this._initialized = false;

    // create CSS element

    this.buildChartingElements = function($rootScope, $log, document) {
        // load the charting JS element
        var chartElementSource = document.createElement('script');
        chartElementSource.type = 'text/javascript';
        chartElementSource.src = 'http://d3js.org/d3.v3.min.js';
        chartElementSource.onload = this.buildProviderLoadHandler($rootScope, $log);
        document.getElementsByTagName('head')[0].appendChild(chartElementSource);
    }

    // Create handler for when the D3 script include element is loaded onto the page

    this.onProviderLoadedHandler = function($rootScope, $log) {
        $rootScope.$broadcast('charting-event-loaded');
    }

    // Curry a method with empty signature that I can use as an event handler
    // but which has access to $rootScope and $log

    this.buildProviderLoadHandler = function($rootScope, $log) {
        var self = this;
        return function() {
            self.onProviderLoadedHandler($rootScope, $log);
        };
    };

    // Define $get (called when the provider is loaded into the app)

    this.$get = function ($rootScope, $log) {
        if (!this._initialized) {
            this._initialized = true;
            this.buildChartingElements($rootScope, $log, document);
        }
        return this;
    };

});
