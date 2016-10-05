'use strict';

angular.module('MainApplicationModule')
    .provider('FacebookAuthenticationProvider', function () {

    this._initialized = false;

    this.buildAuthenticationElements = function($rootScope, $log, document) {

      window.fbAsyncInit = function() {
        FB.init({
          appId      : '1746146605665179',
          xfbml      : true,
          version    : 'v2.8'
        });
        FB.AppEvents.logPageView();
        $rootScope.$broadcast('facebook-sdk-event-loaded');
      };

      if (document.getElementById('facebook-jssdk')) {
        return;
      }

      var js = document.createElement('script');
      js.id = 'facebook-jssdk';
      js.src = "//connect.facebook.net/en_US/sdk.js";
      // js.onload = this.buildProviderLoadHandler($rootScope, $log);
      document.getElementsByTagName('head')[0].appendChild(js);
    }

    // Create handler for when the script include element is loaded onto the page

    this.onProviderLoadedHandler = function($rootScope, $log) {
        $rootScope.$broadcast('facebook-sdk-event-loaded');
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
            this.buildAuthenticationElements($rootScope, $log, document);
        }
        return this;
    };

});
