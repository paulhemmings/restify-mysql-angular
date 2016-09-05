angular
    .module('MainApplicationModule')
    .directive('autoSize', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                var height = element[0].offsetHeight;
                element.bind('input', function() {
                    if (element[0].scrollHeight > height) {
                        element.css('height', element[0].scrollHeight - diff + 'px');
                    }
                });

            }
        };
    }]);
