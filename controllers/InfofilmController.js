var app = angular.module("umovie-app");

app.controller("InfofilmCtrl", [
    '$rootScope',
    '$scope',
    '$api',
    '$cookies',
    function($rootScope, $scope, $api, $cookies) {
    	var idMovie = 1134823596;
    	loadMovie(idMovie);

    	$scope.goToActorPage = function goToActorPage() {
    		$('#modal1').modal("close");
    		location.hash = "#!/actor";
    	};

	    function loadMovie(idMovie){
	    	$cookies.put("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1OGE0NzQ1NmI5ZmQ3NDA0MDA0OTYyOTIiLCJleHAiOjE0ODczNTc1ODI2MjJ9.skBs-24LkghXTF30H7BjJJ0RB32F4OBDlmT-ZsG5YAc");
	    	$api.movie(idMovie).then(function successCallback(response) {
	    		$scope.movieTitle = response.data.results[0].trackName;
	    		$scope.actorName = response.data.results[0].artistName;
	    		$scope.moviePreview = response.data.results[0].previewUrl;
	    		$scope.movieResumee = response.data.results[0].longDescription;
	    		$scope.movieItunes = response.data.results[0].trackViewUrl;
	    		$scope.movieType = response.data.results[0].primaryGenreName;
	    		$scope.movieDate = response.data.results[0].releaseDate.substr(0, 4);
	    		$scope.movieRating = response.data.results[0].contentAdvisoryRating;
	    		$scope.movieBanner = response.data.results[0].artworkUrl100;
        	}, function errorCallback(response) {
        	});
	    }
    }
]);