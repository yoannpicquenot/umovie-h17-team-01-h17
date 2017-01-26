var app = angular.module("umovie-app", [
    "ngRoute",
    "ngCookies",
    "ui.materialize"
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
            .when('/tvshow', {
                templateUrl: "./views/tvshow.html",
                controller: "TvShowCtrl"
            })
            .when('/actor', {
                templateUrl: "./views/actor.html",
                controller: "ActorCtrl"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
]);
