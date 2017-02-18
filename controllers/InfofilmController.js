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
	    	$api.movie(idMovie).then(function successCallback(response) {
	    		$scope.movie = response.data.results[0];
	    		$scope.movieBanner = response.data.results[0].artworkUrl100;
        	}, function errorCallback(response) {
        	});
	    }
    }
]);