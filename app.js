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
    function ($rootScope, $api, $cookies) {
        $rootScope.overlayloading = true;
        if ($cookies.get('token')) {
            $api.auth()
                .then(function successCallback(response) {
                    var data = response.data;
                    $rootScope.connected = true;
                    $rootScope.user = {
                        name: data.name,
                        email: data.email,
                        id: data.id
                    };
                }, function errorCallback(response) {
                    if (response.status == 401 && window.location.hash !== '#!/home') {
                        window.location.href = window.location.origin + "#!/login";
                    }
                    $rootScope.overlayloading = false;
                    var cookies = $cookies.getAll();
                    angular.forEach(cookies, function (v, k) {
                        $cookies.remove(k);
                    });
                });
        } else {
            if (window.location.hash !== '#!/home' && window.location.hash !== '') {
                window.location.href = window.location.origin + "#!/login";
            }
            $rootScope.overlayloading = false;
            var cookies = $cookies.getAll();
            angular.forEach(cookies, function (v, k) {
                $cookies.remove(k);
            });
        }
    }
]);
