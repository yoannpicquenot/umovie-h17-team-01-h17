var app = angular.module("umovie-app");

app.factory("$api", [
    "$http",
    "$rootScope",
    function ($http, $rootScope) {
        var apiUrl = "https://umovie.herokuapp.com";
        //var apiUrl = "http://localhost:3000"; // local
        return {
            auth: function auth() {
                return $http({
                    url: apiUrl + '/tokeninfo',
                    method: 'GET',
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
            getAllWatchlist: function getAllWatchlist() {
                return $http({
                    url: apiUrl + '/watchlists',
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
            deleteWatchlist: function deleteWatchlist(watchlistId) {
                return $http({
                    url: `${apiUrl}/watchlists/${watchlistId}`,
                    method: 'DELETE',
                });
            },
						actor: function actor(id) {
								return $http({
										url: apiUrl + '/actors/' + id,
										method: 'GET'
								});
						},
						actorMovies: function actorMovies(id) {
								return $http({
										url: apiUrl + '/actors/' + id + '/movies',
										method: 'GET'
								});
						}
        };
    }
]);
