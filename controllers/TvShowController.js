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
    loadTvShow(tvshowId);
    loadTvShowEpisodes(tvshowId);
    $rootScope.tabActive = "tvshow";

    $scope.episodes = [];

    function loadTvShow(tvshowId) {
      $api.tvshow(tvshowId).then(function successCallback(response) {
        response.data.results[0].artworkUrl100 = response.data.results[0].artworkUrl100.replace("100x100", "227x227");
        response.data.results[0].releaseDate = response.data.results[0].releaseDate.substr(0, 10);
        $scope.tvShow = response.data.results[0];
      }, function errorCallback(response) {});
    }

    function loadTvShowEpisodes(tvshowId) {
      $api.tvshowEpisodes(tvshowId).then(function successCallback(response) {
        var episodes = response.data.results;

        jwplayer("myvideo5").setup({
          file: response.data.results[0].previewUrl,
          image: response.data.results[0].artworkUrl100.replace("100x100", "227x227")
        });

        if (episodes) {
          for (episode of episodes) {
            episode.artworkUrl100 = episode.artworkUrl100.replace("100x100", "227x227");
            $scope.episodes.push(episode);
          }
        }
      }, function errorCallback(response) {});
    }

    $scope.loadCarousel = function () {
      $(".carousel").carousel();
    }
  }
]);
