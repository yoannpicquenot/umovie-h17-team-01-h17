var app = angular.module("umovie-app", [
    "ngRoute",
    "ngCookies",
    "ui.materialize"
]);

app.config([
    "$routeProvider",
    "$httpProvider",
    function ($routeProvider, $httpProvider) {
        $httpProvider.interceptors.push('interceptor');

        $routeProvider
            .when('/home', {
                templateUrl: "./views/home.html",
                controller: "HomeCtrl"
            })
            .when('/watchlists/:id?', {
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
            .when('/login', {
                templateUrl: "./views/login.html",
                controller: "LoginCtrl"
            })
            .when('/signup', {
                templateUrl: "./views/signup.html",
                controller: "LoginCtrl"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
]);
