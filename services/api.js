var app = angular.module("umovie-app");

app.factory("$api", [
	"$http",
	"$cookies",
	function($http, $cookies) {
		var apiUrl = "https://umovie.herokuapp.com";
		return {
			logout: function logout() {
				return $http({
					url: apiUrl + '/logout',
					method: 'GET',
					contentType: 'application/x-www-form-urlencoded'
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
			auth: function auth() {
				return $http({
					url: apiUrl + '/tokeninfo',
					method: 'GET',
					contentType: 'application/x-www-form-urlencoded'
				});
			}
		};
	}
]);