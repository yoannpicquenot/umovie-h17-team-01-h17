var app = angular.module("umovie-app");
app.controller("ActorCtrl", [
    '$rootScope',
    '$scope',
    function($rootScope, $scope) {
      var alreadyLoaded = false;

      $rootScope.tabActive = "actor";
      $rootScope.$on('$viewContentLoaded', function() {
        if (!alreadyLoaded) {
          $('.modal').modal();
          alreadyLoaded = true;
        }
      });
    }
]);
