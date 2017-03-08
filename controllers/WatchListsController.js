var app = angular.module("umovie-app");
app.controller("WatchListsCtrl", [
    "$rootScope",
    "$scope",
    "$api",
    "$toaster",
    function($rootScope, $scope, $api, $toaster) {
        $rootScope.tabActive = "watchlists";
        $scope.watchlists = [];
        $rootScope.overlayloading = true;

        $api.getAllWatchlist().then(function success(response) {
            var watchlists = response.data;
            if (watchlists) {
                for (watchlist of watchlists) {
                    if (watchlist.owner && watchlist.owner.id == $rootScope.user.id) {
                        $scope.watchlists.push(watchlist);
                    }
                }
                $rootScope.overlayloading = false;
            }
        }, function error(response) {});

        $rootScope.$on('$viewContentLoaded', function() {
            $('.modal')
                .modal({
                    dismissible: false
                });
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

        $scope.openModal = function openModal(idModal) {
            $(`#${idModal}`).modal('open');
        }

        $scope.pressButtonCarousel = function pressButtonCarousel(watchlist, move) {
            $(`#${watchlist.id}-carousel`).carousel(move);
        };

        $scope.createWatchlist = function createWatchlist(watchlistName) {
            $api.createWatchlist(watchlistName).then(function successCb(response) {
                $scope.watchlists.push(response.data);
                $toaster.create({
                    type: 'success',
                    text: $rootScope.translate('watchlist_created_msg')
                });
                $('#modal-add').modal('close');
            }, function errorCallback() {});
        };

        $scope.deleteWatchlist = function deleteWatchlist(watchlistId) {
            $api.deleteWatchlist(watchlistId).then(function successCallback() {
                angular.forEach($scope.watchlists, function(watchlist, index) {
                    if (watchlistId == watchlist.id) {
                        $scope.watchlists.splice(index, 1);
                    }
                });
                $toaster.create({
                    type: 'success',
                    text: $rootScope.translate('watchlist_deleted_msg')
                });
            }, function errorCallback() {});
        };

        $scope.setDeletingWatchlist = function setDeletingWatchlist(watchlist) {
            $scope.selectedWatchlist = watchlist;
        };

        $scope.addMovies = function addMovies(watchlist) {
        };
    }
]);
