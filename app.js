var app = angular.module("umovie-app", [
    "ngRoute",
    "ngCookies",
    "ui.materialize"
]);

var id = {"email":"yoann.picquenot@gmail.com","name":"Yoann Picquenot","following":[],"id":"58a205b685d1820400e8d567"};

app.config([
    "$routeProvider",
    "$httpProvider",
    function($routeProvider, $httpProvider) {
        $httpProvider.interceptors.push('interceptor');

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

app.run([
    "$rootScope",
    "$api",
    "$cookies",
    function($rootScope, $api, $cookies) {
        $rootScope.overlayloading = true;
        if ($cookies.get('token')) {
            $api.auth().then(function successCallback(response) {
                var data = response.data;
                $rootScope.connected = true;
                $rootScope.user = {
                    name: data.name,
                    email: data.email,
                    id: data.id
                };
                $rootScope.overlayloading = false;
            }, function errorCallback(response) {
                if (response.status == 401 && window.location.hash !== '#!/home') {
                    window.location.href = window.location.origin + "#!/login";
                }

                $rootScope.overlayloading = false;
            });
        } else {
            $rootScope.overlayloading = false;
        }
    }
]);