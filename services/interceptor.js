var app = angular.module("umovie-app");
app.factory('interceptor', function($q, $cookies, $injector, $rootScope) {
    return {
        'request': function(config) {
            var token = $cookies.get("token");
            config.headers.Authorization = token;
            if (token && config.url.indexOf('/tokeninfo') === -1) {
                $injector.get("$api").auth()
                    .then(function successCallback(response) {
                        var data = response.data;
                        $rootScope.connected = true;
                        $rootScope.user = {
                            name: data.name,
                            email: data.email,
                            id: data.id
                        };
                        return config;
                    }, function errorCallback(response) {
                        $cookies.remove("token");
                        return config;
                    });
            }
            return config;
        }
    }
});
