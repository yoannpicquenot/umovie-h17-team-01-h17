var app = angular.module("umovie-app");
app.controller('NavbarCtrl', [
    "$scope",
    "$rootScope",
    "$cookies",
    "$api",
    function($scope, $rootScope, $cookies, $api) {
        var alreadyLoaded = false;
        $scope.logout = function logout() {
            $api.logout().then(function successCallback(response) {
                var cookies = $cookies.getAll();
                console.log(response);
                angular.forEach(cookies, function(v, k) {
                    $cookies.remove(k);
                });
                window.location.href = window.location.origin;
            }, function errorCallback(response) {
                console.log(response);
            });
        };
        $rootScope.$on('$viewContentLoaded', function() {
            if (!alreadyLoaded) {
                $(".button-collapse").sideNav({
                    closeOnClick: true,
                    edge: 'left',
                });
                $(".dropdown-button").dropdown();
                alreadyLoaded = true;
            }
        });
    }
]);