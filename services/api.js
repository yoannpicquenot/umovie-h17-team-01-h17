var app = angular.module("umovie-app");

app.factory("$api", [
    "$http",
    "$rootScope",
    function($http, $rootScope) {
        var apiUrl = "https://umovie.herokuapp.com";
        //var apiUrl = "http://localhost:3000"; // local

        function htmlEscape(str) {
            return str
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        }

        return {
            auth: function auth() {
                return $http({
                    url: apiUrl + '/tokeninfo',
                    method: 'GET',
                    contentType: 'application/x-www-form-urlencoded'
                });
            },
            actor: function actor(id) {
                return $http({
                    url: apiUrl + '/actors/' + id,
                    method: 'GET'
                });
            },
            getActorByName: function getActorByName(name) {
                return $http({
                    url: apiUrl + '/search/actors?q=' + htmlEscape(name)
                });
            },
            actorMovies: function actorMovies(id) {
                return $http({
                    url: apiUrl + '/actors/' + id + '/movies',
                    method: 'GET'
                });
            },
            addMovie: function addMovie(watchlistId, movie) {
                return $http({
                    url: apiUrl + '/watchlists/' + watchlistId + "/movies",
                    method: 'POST',
                    data: movie,
                    contentType: 'application/x-www-form-urlencoded'
                });
            },
            createWatchlist: function createWatchlist(watchlistName) {
                return $http({
                    url: apiUrl + '/watchlists',
                    method: 'POST',
                    data: {
                        "name": watchlistName,
                        "owner": $rootScope.user.id
                    },
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
            },
            deleteWatchlist: function deleteWatchlist(watchlistId) {
                return $http({
                    url: `${apiUrl}/watchlists/${watchlistId}`,
                    method: 'DELETE',
                });
            },
            getAllWatchlist: function getAllWatchlist() {
                return $http({
                    url: apiUrl + '/watchlists',
                    method: 'GET',
                });
            },
            getWatchlist: function getWatchlist(id) {
                return $http({
                    url: apiUrl + '/watchlists/' + id,
                    method: 'GET',
                });
            },
            logout: function logout() {
                return $http({
                    url: apiUrl + '/logout',
                    method: 'GET',
                });
            },
            movie: function movie(id) {
                return $http({
                    url: apiUrl + '/movies/' + id,
                    method: 'GET'
                });
            },
            searchMovieWithString: function searchMovieWithString(str) {
                return $http({
                    url: apiUrl + '/search/movies?q=' + str,
                    method: 'GET',
                });
            },
            signin: function signin(email, password) {
                return $http({
                    url: apiUrl + '/login',
                    method: 'POST',
                    data: {
                        email,
                        password
                    },
                    "Content-Type": 'application/x-www-form-urlencoded'
                });
            },
            signup: function signup(user) {
                return $http({
                    url: apiUrl + '/signup',
                    method: 'POST',
                    data: user
                });
            },
        };
    }
]);
