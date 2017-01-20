var app = angular.module("umovie-app");

app.controller("WatchListsCtrl", [
    "$rootScope",
    "$scope",
    function($rootScope, $scope) {
        $rootScope.tabActive = "watchlists";
    }
]);