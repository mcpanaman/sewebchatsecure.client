var chatApp = angular.module('chatApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar']);

chatApp.config(function ($routeProvider){
    $routeProvider.when('/chat', {
        templateUrl: 'chat.html',
        controller: 'ChatCtrl'
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
        })
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'RegisterCtrl'
        })
        .otherwise({
            redirectTo: '/login'
        });
});

//Add this to have access to a global variable
/*chatApp.run(function ($rootScope) {
    $rootScope.loggedInUsername = ''; //global variable
});*/

chatApp.config(function ($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call
    //that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.interceptors.push('authInterceptorService');
});

chatApp.run(function (authService) {
    authService.fillAuthData();
});

//Directive for entering chat message
chatApp.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});