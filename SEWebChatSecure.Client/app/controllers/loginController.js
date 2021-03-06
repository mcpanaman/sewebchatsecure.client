'use strict';
chatApp.controller('LoginCtrl', function ($scope, $location, authService) {

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {
                $location.path('/chat');
            },
            function (err) {
                $scope.message = err.error_description;
            });
    };
});