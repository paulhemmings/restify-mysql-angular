
// define App module

angular.module('MainApplicationModule', ['ui.router', 'ngCookies']);

// Configure App module

angular
    .module('MainApplicationModule')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise('/home');
          $stateProvider
              .state('charting', {
                  url:'/chart',
                  views: {
                      'navigation': {
                          templateUrl: '/app/partials/navigation.html',
                          controller: 'NavigationController'
                      },
                      'content': {
                          templateUrl: '/app/partials/chart.html',
                          controller: 'ChartController'
                      }
                  }
              })
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
              .state('logging-out', {
                  url:'/logout',
                  views: {
                      'navigation': {
                          templateUrl: '/app/partials/navigation.html',
                          controller: 'NavigationController'
                      },
                      'content': {
                          templateUrl: '/app/partials/logout.html',
                          controller: 'LogoutController'
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
    .run( function($rootScope, ChartingProvider, FacebookAuthenticationProvider) {
        // this will fire off the charting provider
        // so it is *needed* even if it isn't actually used.
    });
