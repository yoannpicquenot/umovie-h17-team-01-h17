var app = angular.module("umovie-app");

app.controller("InfofilmCtrl", [
    '$rootScope',
    '$scope',
    '$api',
    '$location',
    function($rootScope, $scope, $api, $location) {
        $scope.goToActorPage = function goToActorPage() {
            $api.getActorByName($scope.currentMovie.artistName).then(function successCallback(response) {
                if (response.data.resultCount > 0) {
                    $("#modal-infofilm").modal("close");
                    $location.path(`/actor/${response.data.results[0].artistId}`);
                }
            }, function errorCallback() {});
        };
        $scope.$watch("currentMovie", function() {
            if ($scope.currentMovie && $scope.currentMovie.trackId) {
                $api.movie($scope.currentMovie.trackId).then(function successCallback(response) {
                    $scope.movie = response.data.results[0];

                    search(response.data.results[0].trackName);

                    $scope.movieBanner = response.data.results[0].artworkUrl100;
                }, function errorCallback(response) {});
            }
        });
    }
]);
