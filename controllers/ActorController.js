var app = angular.module("umovie-app");

app.controller("ActorCtrl", [
    '$rootScope',
    '$scope',
    '$api',
    '$cookies',
    '$routeParams',
    function($rootScope, $scope, $api, $cookies, $routeParams) {
      var alreadyLoaded = false;
      var actorId = $routeParams.id;
      // var actorId = 286146221;
      loadActor(actorId);
      loadActorMovies(actorId);

      $scope.movies = [];
      $rootScope.tabActive = "actor";
      $rootScope.$on('$viewContentLoaded', function() {
        if (!alreadyLoaded) {
          $('.modal').modal();
          alreadyLoaded = true;
        }
      });

      function loadActor(actorId){
	    	$api.actor(actorId).then(function successCallback(response) {
	    		$scope.actor = response.data.results[0];
        	}, function errorCallback(response) {
        	});
	    }

      function loadActorMovies(actorId){
        $api.actorMovies(actorId).then(function successCallback(response) {
          var movies = response.data.results;
          if (movies) {
            for (movie of movies) {
              movie.artworkUrl100 = movie.artworkUrl100.replace("100x100", "227x227");
              $scope.movies.push(movie);
            }
          }
        }, function errorCallback(response) {
        });
      }
    }
]);
