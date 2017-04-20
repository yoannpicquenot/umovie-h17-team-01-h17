var app = angular.module("umovie-app");

app.controller("SearchResultsCtrl", [
    '$rootScope',
    '$scope',
    function ($rootScope, $scope) {
        $rootScope.tabActive = "searchresults";
        $rootScope.overlayloading = false;
        var searchFilter = $routeParams.type;
        var input = $routeParams.input;
        $scope.movieResults = [];
        $scope.tvshowResults = [];
        $scope.actorResults = [];
        $scope.userResults = [];
        executeSearch();

        function executeSearch() {
            if (searchFilter == "none"){
                $api.searchAllWithString(input).then(function successCallback(res) {
                    var searchResults = res.data.results;
                    separatingCategories(searchResults);
                }, function errorCallback(res) {});
            } else if (searchFilter == "movie") {
                $api.searchMovieWithString(input).then(function successCallback(res) {
                    var searchResults = res.data.results;
                    separatingCategories(searchResults);
                }, function errorCallback(res) {});
            } else if (searchFilter == "tvshow") {
                $api.searchTvShowSeasonWithString(input).then(function successCallback(res) {
                    var searchResults = res.data.results;
                    separatingCategories(searchResults);
                }, function errorCallback(res) {});
            } else if (searchFilter == "actor"){
                $api.searchActorWithString(input).then(function successCallback(res) {
                    var searchResults = res.data.results;
                    separatingCategories(searchResults);
                }, function errorCallback(res) {});
            } else if (searchFilter == "user"){
                $api.searchUserWithString(input).then(function successCallback(res) {
                    var searchResults = res.data.results;
                    separatingCategories(searchResults);
                }, function errorCallback(res) {});
            }
        };

        function separatingCategories(data){
            if (data.length > 0){
                for (var i = 0; i < data.length; i++){
                    if (data[i].wrapperType == "track") {
                        $scope.movieResults.push(data[i]);
                    } else if (data[i].wrapperType == "collection") {
                        $scope.tvshowResults.push(data[i]);
                    } else if (data[i].wrapperType == "artist") {
                        $scope.actorResults.push(data[i]);
                    } else if (data[i].email != undefined) {
                        $scope.userResults.push(data[i]);
                    }
                }
            }
        };
       
    }
]);
