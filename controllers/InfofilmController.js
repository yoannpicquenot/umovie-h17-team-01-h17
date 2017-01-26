var app = angular.module("umovie-app");

app.controller("InfofilmCtrl", [
    '$rootScope',
    '$scope',
    function($rootScope, $scope) {
    	$scope.goToActorPage = function goToActorPage() {
    		$('#modal1').modal("close");
    		location.hash = "#!/actor";
    	};
    }
]);