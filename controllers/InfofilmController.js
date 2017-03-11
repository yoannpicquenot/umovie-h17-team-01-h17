var app = angular.module("umovie-app");

app.controller("InfofilmCtrl", [
    '$rootScope',
    '$scope',
    '$api',
    function($rootScope, $scope, $api) {
        $scope.goToActorPage = function goToActorPage() {
            $api.getActorByName($scope.currentMovie.artistName).then(function successCallback(response) {
                if (response.data.resultCount > 0) {
                    $("#modal-infofilm").modal("close");
                    location.hash = `#!/actor/${response.data.results[0].artistId}`;
                }
            }, function errorCallback() {});
        };
        $scope.$watch("currentMovie", function() {
            if ($scope.currentMovie && $scope.currentMovie.trackId) {
                $api.movie($scope.currentMovie.trackId).then(function successCallback(response) {
                    $scope.movie = response.data.results[0];
                    $scope.movieBanner = response.data.results[0].artworkUrl100;
                }, function errorCallback(response) {});
            }
        });

    }
]);
