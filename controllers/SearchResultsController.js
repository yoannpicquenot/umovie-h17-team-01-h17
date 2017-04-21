var app = angular.module("umovie-app");

app.controller("SearchResultsCtrl", [
    '$rootScope',
    '$scope',
    '$api',
    function ($rootScope, $scope, $api) {
        $rootScope.tabActive = "searchresults";
        $rootScope.overlayloading = false;
        
        $scope.select = {};
        $scope.select.searchOptions = ["All", "Movie", "TV Show", "Actor", "User"];
        $scope.select.selectedGenre = ["No Filter", "Action", "Romance", "Drama", "Comedy", "Documentary", "Nonfiction"];
        $scope.movieResults = [];
        $scope.tvshowResults = [];
        $scope.actorResults = [];
        $scope.userResults = [];

        $scope.executeSearch = function() {
            if ($scope.select.searchOption != ""){
                resetSearch();
                if ($scope.select.searchOption == "All" || $scope.select.searchOption == undefined){
                $api.searchAllWithString($scope.globalSearchInput).then(function successCallback(res) {
                        var searchResults = res.data.results;
                        separatingCategories(searchResults);
                    }, function errorCallback(res) {});
                } else if ($scope.select.searchOption == "Movie") {
                    $api.searchMovieWithString($scope.globalSearchInput).then(function successCallback(res) {
                        var searchResults = res.data.results;
                        separatingCategories(searchResults);
                    }, function errorCallback(res) {});
                } else if ($scope.select.searchOption == "TV Show") {
                    $api.searchTvShowSeasonWithString($scope.globalSearchInput).then(function successCallback(res) {
                        var searchResults = res.data.results;
                        separatingCategories(searchResults);
                    }, function errorCallback(res) {});
                } else if ($scope.select.searchOption == "Actor"){
                    $api.searchActorWithString($scope.globalSearchInput).then(function successCallback(res) {
                        var searchResults = res.data.results;
                        separatingCategories(searchResults);
                    }, function errorCallback(res) {});
                } else if ($scope.select.searchOption == "User"){
                    $api.searchUserWithString($scope.globalSearchInput).then(function successCallback(res) {
                        var searchResults = res.data;
                        separatingCategories(searchResults);
                    }, function errorCallback(res) {});
                }
            }
        };

        function resetSearch(){
            $scope.movieResults = [];
            $scope.tvshowResults = [];
            $scope.actorResults = [];
            $scope.userResults = [];
        }

        function separatingCategories(data){
            if (data.length > 0 || data != undefined){
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

        $scope.goTo = function(content){
            if (content.wrapperType == "collection"){
                location.pathname = "/tvshow/" + content.collectionId;
            } else if (content.wrapperType == "track"){
                location.pathname = "/infofilm/" + content.trackId;
            } else if (content.wrapperType == "artist"){
                location.pathname = "/actor/" + content.artistId;
            } else if (content.email != undefined){
                location.pathname = "/user/" + content.id;
            }
            
        }
       
    }
]);


/*<ul class="autocomplete-content dropdown-content" ng-hide="!globalSearchInput" style="overflow-y: auto; height: 200px">
                            <li ng-repeat="item in items" class="movie-suggestion">
                                <div class="left" ng-click="launchSearch(item)">
                                    <img ng-src="{{ movie.artworkUrl100.replace('100x100', '400x400') }}">
                                    <span style="color: #FFFFFF;">
                                        stuff to add
                                    </span>
                                </div>
                            </li>
                        </ul> */