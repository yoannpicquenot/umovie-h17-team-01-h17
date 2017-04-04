var app = angular.module("umovie-app");
app.controller("HomeCtrl", [
    '$rootScope',
    '$scope',
    function ($rootScope, $scope) {
        $rootScope.tabActive = "home";
        $rootScope.overlayloading = false;

        $rootScope.$on('$viewContentLoaded', function () {
            $('.parallax').parallax();
            $scope.buttonPageindicator = function buttonPageindicator(section) {
                $('html,body')
                    .stop();
                $('html,body')
                    .animate({
                        scrollTop: $(section)
                            .offset()
                            .top
                    }, 1000);
            };
        });

    }
]);
