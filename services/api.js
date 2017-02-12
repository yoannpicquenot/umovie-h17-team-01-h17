var app = angular.module("umovie-app");

app.factory("api", [
	"$http",
	function($http) {
		var apiUrl = "https://umovie.herokuapp.com";
		return {
			logout: function logout() {
				return $http({
					url: apiUrl + '/logout',
					method: 'GET'
				});
			},
			/*Ceci est un exemple (fonctionnel) les gars*/
		};
	}
]);