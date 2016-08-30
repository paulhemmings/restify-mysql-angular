
// define App module

angular.module('MainApplicationModule', ['ui.router']);

// Configure App module

angular
    .module('MainApplicationModule')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise('/home');
          $stateProvider
              .state('logging-in', {
                  url:'/login',
                  views: {
                      'navigation': {
                          templateUrl: '/app/partials/navigation.html',
                          controller: 'NavigationController'
                      },
                      'content': {
                          templateUrl: '/app/partials/login.html',
                          controller: 'LoginController'
                      }
                  }
              })
              .state('home', {
                  url:'/home',
                  views: {
                      'navigation': {
                          templateUrl: '/app/partials/navigation.html',
                          controller: 'NavigationController'
                      },                      
                      'content': {
                          templateUrl: '/app/partials/home.html',
                          controller: 'HomeController'
                      }
                  }
              });
    }])
    .run( function($rootScope, ChartingProvider) {
        // this will fire off the charting provider
        // so it is *needed* even if it isn't actually used.
    });
