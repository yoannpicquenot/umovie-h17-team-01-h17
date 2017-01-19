var app = angular.module("umovie-app", [
    "ngRoute",
    "ngCookies"
]);

app.config([
    "$routeProvider",
    function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: "./views/home.html",
                controller: "HomeCtrl"
            })
            .when('/watchlists', {
                templateUrl: "./views/watchlists.html",
                controller: "WatchListsCtrl"
            })
            .when('/infofilm', {
                templateUrl: "./views/infofilm.html",
                controller: "InfofilmCtrl"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
]);
