var app = angular.module("umovie-app");
app.controller('NavbarCtrl', [
    "$scope",
    "$rootScope",
    "$cookies",
    "$api",
    "$toaster",
    function ($scope, $rootScope, $cookies, $api, $toaster) {
        var alreadyLoaded = false;
        $scope.logout = function logout() {
            $rootScope.overlayloading = true;
            $api.logout()
                .then(function successCallback(response) {
                    var cookies = $cookies.getAll();
                    angular.forEach(cookies, function (v, k) {
                        $cookies.remove(k);
                    });
                    window.location.hash = "#!/login";
                    $rootScope.overlayloading = false;
                    $toaster.create({
                        type: 'success',
                        text: $rootScope.translate("msg_logout_success")
                    });
                }, function errorCallback(response) {});
        };
        $rootScope.$on('$viewContentLoaded', function () {
            if (!alreadyLoaded) {
                $(".button-collapse")
                    .sideNav({
                        closeOnClick: true,
                        edge: 'left',
                    });
                $(".dropdown-button")
                    .dropdown();
                alreadyLoaded = true;
            }
        });

        $scope.initDropdown = function initDropdown() {
            $(".dropdown-button")
                .dropdown();
        };
    }
]);
