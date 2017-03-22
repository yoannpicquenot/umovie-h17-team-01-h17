var app = angular.module('umovie-app');

app.controller('UserCtrl', [
    '$rootScope',
    '$scope',
    '$route',
    '$api',
    function ($rootScope, $scope, $route, $api) {
        $rootScope.overlayloading = true;
        $scope.currentUser = {};
        $api.getUser($route.current.params.uid).then(function (res) {
            $scope.currentUser = res.data;
            console.log($scope.currentUser);
            $rootScope.overlayloading = false;
        }, function (err) {});
    }
]);
