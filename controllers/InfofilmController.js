var app = angular.module("umovie-app");

app.controller("InfofilmCtrl", [
    '$rootScope',
    '$scope',
    '$api',
    '$route',
    function($rootScope, $scope, $api, $route) {
        $scope.goToActorPage = function goToActorPage() {
            $api.actorMovies($scope.currentMovie.trackId).then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback() {});
            //location.hash = "#!/actor";
        };

        $scope.$watch("currentMovie", function() {
            if ($scope.currentMovie.trackId) {
                $api.movie($scope.currentMovie.trackId).then(function successCallback(response) {
                    $scope.movie = response.data.results[0];
                    $scope.movieBanner = response.data.results[0].artworkUrl100;
                }, function errorCallback(response) {});
            }
        });

    }
]);
