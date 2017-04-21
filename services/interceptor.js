var app = angular.module("umovie-app");
app.factory('interceptor', function($cookies, $injector, $rootScope) {
    return {
        'request': function(config) {
            var token = $cookies.get("token");
            config.headers.Authorization = token;
            if (token && config.url.indexOf('/tokeninfo') === -1) {
                $injector.get("$api").auth()
                    .then(function successCallback(response) {
                        $rootScope.connected = true;
                        $rootScope.user = response.data;
                        $rootScope.user.avatarUrl = `https://www.gravatar.com/avatar/${md5($rootScope.user.email.trim())}?s=300`;
                        $rootScope.md5 = md5;
                        return config;
                    }, function errorCallback(response) {
                        $cookies.remove("token");
                        location.pathname = "/login";
                        return config;
                    });
            } else if (token && token.length == 0) {
                location.pathname = "/login";
            }
            return config;
        },
        'responseError': function(config) {
            var codes = {
                "401" : function() {
                    location.pathname = "/login";
                } 
            };
            (codes[config.status])();
            return config;
        }
    }
});
