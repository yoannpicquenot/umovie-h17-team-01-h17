var app = angular.module("umovie-app");
app.controller("LoginCtrl", [
    "$rootScope",
    "$scope",
    "$api",
    "$cookies",
    function($rootScope, $scope, $api, $cookies) {
        $rootScope.tabActive = "login";
        $scope.email = '';
        $scope.password = '';
        $scope.pressButtonConnection = function pressButtonConnection(email, password) {
            if (email && email.toString().match(/.*@[a-z]*\.[a-z]*$/) && password) {
                $api.signin(email, password).then(function successCallback(response) {
                    angular.forEach(response.data, function(value, key) {
                        $cookies.put(key, value);
                    });
                    window.location.href = window.location.origin;
                }, function errorCallback(response) {});
            }
        };
        $rootScope.$on('$viewContentLoaded', function() {});
    }
]);