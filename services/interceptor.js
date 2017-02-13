var app = angular.module("umovie-app");

app.factory('interceptor', function($q, $cookies) {
	return {
		'request': function(config) {
			var token = $cookies.get("token");

			config.headers.Authorization = token;
			return config;
		}
	}
});