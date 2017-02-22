var app = angular.module("umovie-app");

app.controller("WatchListsCtrl", [
    "$rootScope",
    "$scope",
    "$api",
    function ($rootScope, $scope, $api) {
        $rootScope.tabActive = "watchlists";
        $scope.watchlists = [];
        $rootScope.overlayloading = true;
        $api.getAllWatchlist()
            .then(function successCallback(response) {
                var data = response.data;
                for (var i = data.length - 1; i >= 0; i--) {
                    if (data[i].movies.length != 0) {
                        $scope.watchlists.push(data[i]);
                    }
                }
                $rootScope.overlayloading = false;
            }, function errorCallback(response) {});

        $rootScope.$on('$viewContentLoaded', function () {
            $('.modal')
                .modal();
        });

        $scope.loadCarousel = function loadCarousel(watchlist) {
            $('.carousel')
                .carousel({
                    dist: 0,
                    shift: 50,
                    padding: 15,
                    noWrap: false
                });
        };

        $scope.openModalinfofilm = function openModalinfofilm() {
            $('#modal1')
                .modal('open');
        };

        $scope.goTo = function goTo(watchlist) {};

        $scope.pressButtonCarousel = function pressButtonCarousel(watchlist, move) {
            $('#' + watchlist.id + '-carousel')
                .carousel(move);
        };
    }
]);
