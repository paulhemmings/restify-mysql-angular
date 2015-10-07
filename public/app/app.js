angular.module('MainApplicationModule', ['ui.router']);

angular
    .module('MainApplicationModule')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise('/home');
          $stateProvider
              .state('home', {
                  url:'/home',
                  views: {
                      'content': {
                          templateUrl: '/app/partials/home.html',
                          controller: 'HomeController'
                      }
                  }
              });
    }])
