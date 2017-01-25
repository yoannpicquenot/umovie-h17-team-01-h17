var app = angular.module("umovie-app");

app.controller('NavbarCtrl', [
    "$scope",
    "$rootScope",
    function($scope, $rootScope) {
        var alreadyLoaded = false;
        $scope.logout = function logout() {};

        $rootScope.user = {
            name: "Eddy Malou"
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