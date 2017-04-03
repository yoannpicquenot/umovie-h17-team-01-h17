var app = angular.module("umovie-app");

app.controller("TvShowCtrl", [
  '$rootScope',
  '$scope',
  '$api',
  '$cookies',
  '$routeParams',
  function ($rootScope, $scope, $api, $cookies, $routeParams) {
    var alreadyLoaded = false;
    var tvshowId = $routeParams.id;
    $rootScope.tabActive = "tvshow";

    $scope.episodes = [];

    $scope.loadTvShow = function loadTvShow() {
      $api.tvshow(tvshowId).then(function successCallback(response) {
        response.data.results[0].artworkUrl100 = response.data.results[0].artworkUrl100.replace("100x100", "227x227");
        response.data.results[0].releaseDate = response.data.results[0].releaseDate.substr(0, 10);
        $scope.tvShow = response.data.results[0];
      }, function errorCallback(response) {});
    }

    $scope.loadTvShowEpisodes = function loadTvShowEpisodes() {
      $api.tvshowEpisodes(tvshowId).then(function successCallback(response) {
        var episodes = response.data.results;

        search(response.data.results[0].collectionName + ' ' + response.data.results[0].trackName);

        if (episodes) {
          for (episode of episodes) {
            episode.artworkUrl100 = episode.artworkUrl100.replace("100x100", "227x227");
            $scope.episodes.push(episode);
          }
        }
      }, function errorCallback(response) {});
    }

    $scope.loadCarousel = function () {
      $(".carousel").carousel({
        'swipeable': true
      });
    }

    $('body').on('apiYouTubeLoaded', function() {
      $scope.loadTvShow();
      $scope.loadTvShowEpisodes();
    });
  }
]);
