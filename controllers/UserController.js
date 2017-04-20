var app = angular.module('umovie-app');

app.controller('UserCtrl', [
    '$rootScope',
    '$scope',
    '$route',
    '$api',
    '$toaster',
    '$cookies',
    '$location',
    function($rootScope, $scope, $route, $api, $toaster, $cookies, $location) {
        $rootScope.tabActive = "user";
        $scope.isOwner = false;
        $rootScope.overlayloading = true;
        var promises = [];
        $scope.following = false;
        $scope.currentUser = {};
        $scope.watchlists = [];
        $scope.searchOptions = ["All", "Movie", "TV Show", "Actor", "User"];
        var offsets = [];
        $scope.currentWatchlistId = "";
        $api.getUser($route.current.params.uid).then(function(res) {
            $scope.currentUser = res.data;
            $scope.isOwner = $scope.currentUser.id == $cookies.get('id') ? true : false;
            $rootScope.overlayloading = false;

            for (i = 0; i < $rootScope.user.following.length; i++) {
                if ($scope.currentUser.id == $rootScope.user.following[i].id) {
                    $scope.following = true;
                }
            }

            console.log();

            $scope.$emit('userReady');
        }, function(err) {});

        $scope.$on('userReady', function() {
            $api.getAllWatchlist().then(function successCallback(res) {
                angular.forEach(res.data, function(watchlist) {
                    if (watchlist.owner && watchlist.owner.id == $scope.currentUser.id) {
                        $scope.watchlists.push(watchlist);
                    }
                });

                $scope.loaded = true;
                $('.button-follow .btn.following').on('mouseenter', function() {
                    this.innerHTML = '<b>' + $rootScope.translate('unfollow') + '</b>';
                }).on('mouseleave', function() {
                    this.innerHTML = '<b>' + $rootScope.translate('following') + '</b>';
                });
            }, function errorCallback() {});
        })


        $scope.setInitialWatchlist = function setInitialWatchlist(id) {
            $scope.currentWatchlistId = id;
        };

        $scope.initWatchlists = function initWatchlists() {
            $scope.$watch("currentWatchlistId", function(old, newV) {
                var index = 0;
                if (old !== newV) {
                    for (var offset of offsets) {
                        if (offset.id == $scope.currentWatchlistId) {
                            $(".watchlists").stop();
                            $(".watchlists").animate({
                                scrollTop: offsets[index].offset
                            }, 500);
                            return;
                        }
                        ++index;
                    }
                }
            });

            for (var watchlist of $scope.watchlists) {
                offsets.push({
                    id: watchlist.id,
                    offset: $(`#${watchlist.id}`).offset().top - (($(`#${watchlist.id}`).height() + $('.header-container').height() + 110))
                });
            }

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

        $rootScope.$on('$viewContentLoaded', function() {
            $('.modal')
                .modal({
                    dismissible: false,
                });

            $('.materialboxed').materialbox();
        });

        $scope.goToWatchlist = function goToWatchlist(id) {
            $scope.currentWatchlistId = id;
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
                $toaster.create({
                    type: 'success',
                    text: $rootScope.translate("movie_added_text")
                });
                $scope.currentWatchlist.movies.push(movie);
            }, function errorCallback() {});
        };

        $scope.stopSearchingMovies = function stopSearchingMovies() {
            listener();
            $("#modal-add-movies").modal("close");
            $route.reload();
        };

        $scope.loadTabs = function() {
            $("ul.tabs").tabs();
        };

        $scope.loadCarousel = function() {
            $('.carousel')
                .carousel({
                    dist: 0,
                    shift: 50,
                    padding: 15,
                    noWrap: false
                });
        };

        $scope.deleteMovie = function deleteMovie(movie, watchlist) {
            $api.deleteMovieFromWatchlist(movie.trackId, watchlist.id).then(function successCallback(response) {
                $(`#${movie.trackId}`).remove();
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
                $route.reload();
            }, function errorCallback() {});
        };

        $scope.setDeletingWatchlist = function setDeletingWatchlist(watchlist) {
            $scope.selectedWatchlist = watchlist;
        };

        $scope.followUnfollow = function followUnfollow() {
            if (!$scope.following) {
                $api.follow($scope.currentUser.id).then(function successCallback(res) {
                    $toaster.create({
                        type: 'success',
                        text: $rootScope.translate('success_follow_user')
                    });

                    $('.button-follow .btn')
                        .addClass('following')
                        .html('<b>' + $rootScope.translate('following') + '</b>')
                        .on('mouseenter', function() {
                            this.innerHTML = '<b>' + $rootScope.translate('unfollow') + '</b>';
                        })
                        .on('mouseleave', function() {
                            this.innerHTML = '<b>' + $rootScope.translate('following') + '</b>';
                        });
                    $scope.following = true;
                }, function errorCallback() {});
            } else {
                $api.unfollow($scope.currentUser.id).then(function successCallback(res) {
                    $toaster.create({
                        type: 'success',
                        text: $rootScope.translate('success_unfollow_user')
                    });

                    $('.button-follow .btn.following').unbind('mouseenter').unbind('mouseleave').html('<b>' + $rootScope.translate('follow') + '</b>').removeClass('following');

                    $scope.following = false;
                }, function errorCallback(res) {});
            }
        };

        $scope.selectMovie = function selectMovie(movie) {
            $scope.currentMovie = movie;
            $("#modal-infofilm").modal("open");
        };

        $scope.launchGlobalSearch = function launchGlobalSearch() {
            if ($scope.globalSearchInput != undefined || $scope.globalSearchInput != ""){
                // changer la location.pathname vers searchglobal
                // passer le type de filter et le input de la recherche dans l'url. La methode de recherche se fait a louverture de la page searchglobal
            }
        };
    }
]);
