var app = angular.module("umovie-app");

app.factory("$api", [
    "$http",
    "$cookies",
    function ($http, $cookies) {
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
            getAllWatchlist: function getAllWatchlist() {
                return $http({
                    url: apiUrl + '/watchlists',
                    method: 'GET',
                    contentType: 'application/x-www-form-urlencoded'
                });
            },
            logout: function logout() {
                return $http({
                    url: apiUrl + '/logout',
                    method: 'GET',
                    contentType: 'application/x-www-form-urlencoded'
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
                    contentType: 'application/x-www-form-urlencoded'
                });
            },
            signup: function signup(user) {
                return $http({
                    url: apiUrl + '/signup',
                    method: 'POST',
                    data: user
                });
            }
        };
    }
]);
