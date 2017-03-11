var app = angular.module("umovie-app");
app.controller("WatchListsCtrl", [
    "$rootScope",
    "$scope",
    "$api",
    "$toaster",
    "$route",
    function($rootScope, $scope, $api, $toaster, $route) {
        $rootScope.tabActive = "watchlists";
        $rootScope.overlayloading = true;
        $scope.oneWatchlist = false;
        $scope.currentMovie = "";
        $scope.currentWatchlist = {};

        $rootScope.$on('$viewContentLoaded', function() {
            $('.modal')
                .modal({
                    dismissible: false,
                    complete: function() {
                    }
                });
        });

        var listener;
        $scope.addMovies = function addMovies(watchlist) {
            $scope.currentWatchlist = watchlist;
            listener = $scope.$watch("searchMoviesInput", function(value) {
                $api.searchMovieWithString(value).then(function(response) {
                    $scope.movies = response.data.results;
                });
            });
        };

        $scope.addMovieToWatchlist = function addMovieToWatchlist(movie) {
            $api.addMovie($scope.currentWatchlist.id, movie).then(function successCallback(response) {
                $scope.currentWatchlist.movies.push(movie);
            }, function errorCallback() {});
        };

        $scope.stopSearchingMovies = function stopSearchingMovies() {
            listener();
        };

        $scope.selectMovie = function selectMovie(movie) {
            $scope.currentMovie = movie;
            $("#modal-infofilm").modal("open");
        };

        if (!$route.current.params.id) {
            var offsets = [];
            $scope.watchlists = [];
            $scope.currentWatchlistId = "";
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

            $scope.loadCarousel = function loadCarousel() {
                $('.carousel')
                    .carousel({
                        dist: 0,
                        shift: 50,
                        padding: 15,
                        noWrap: false
                    });
            };

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
                    $route.reload();
                    $('#modal-add').modal('close');
                }, function errorCallback() {});
            };

            $scope.setInitialWatchlist = function setInitialWatchlist(id) {
                $scope.currentWatchlistId = id;
            };

            $scope.initWatchlists = function initWatchlists() {
                for (var watchlist of $scope.watchlists) {
                    offsets.push({
                        id: watchlist.id,
                        offset: $(`#${watchlist.id}`).offset().top
                    });
                }
                $scope.$watch("currentWatchlistId", function() {
                    var index = 0;
                    for (var offset of offsets) {
                        if (offset.id == $scope.currentWatchlistId) {
                            $(".watchlists").stop();
                            $(".watchlists").animate({
                                scrollTop: offsets[index].offset - 128
                            }, 500);
                            return;
                        }
                        ++index;
                    }
                });

                $(".watchlists").on("mousewheel", function(e) {
                    var index = 0;
                    for (var offset of offsets) {
                        if (offset.id == $scope.currentWatchlistId) {
                            if (e.originalEvent.wheelDelta < 0) {
                                if (offsets[index + 1]) {
                                    $scope.currentWatchlistId = offsets[index + 1].id;
                                    $scope.$apply();
                                    return;
                                }
                            } else if (e.originalEvent.wheelDelta > 0) {
                                if (offsets[index - 1]) {
                                    $scope.currentWatchlistId = offsets[index - 1].id;
                                    $scope.$apply();
                                    return;
                                }
                            }
                        }
                        ++index;
                    }
                });
            };

            $scope.goToWatchlist = function goToWatchlist(id) {
                $scope.currentWatchlistId = id;
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
                    $route.reload();
                }, function errorCallback() {});
            };

            $scope.setDeletingWatchlist = function setDeletingWatchlist(watchlist) {
                $scope.selectedWatchlist = watchlist;
            };
        } else {
            $rootScope.overlayloading = false;
            $scope.oneWatchlist = true;

            $api.getWatchlist($route.current.params.id).then(function successCallback(response) {
                $scope.watchlist = response.data;
            }, function errorCallback() {});
        }
    }
]);
