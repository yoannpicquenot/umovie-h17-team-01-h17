var app = angular.module("umovie-app");
app.controller("LoginCtrl", [
    "$rootScope",
    "$scope",
    "$api",
    "$cookies",
    "$toaster",
    function ($rootScope, $scope, $api, $cookies, $toaster) {
        $rootScope.tabActive = "login";
        $scope.email = '';
        $scope.password = '';
        $scope.pressButtonConnection = function pressButtonConnection(email, password) {
            $rootScope.overlayloading = true;
            if (email && email.toString()
                .match(/.*@[a-z]*\.[a-z]*$/) && password) {
                $api.signin(email, password)
                    .then(function successCallback(response) {
                        $rootScope.user = {
                            name: response.data.name,
                            email: response.data.email,
                            id: response.data.id
                        };
                        angular.forEach(response.data, function (value, key) {
                            $cookies.put(key, value);
                        });
                        $toaster.create({
                            type: 'success',
                            text: $scope.translate('login_msg_success_connection')
                        });
                        location.hash = "#!/home";
                        $rootScope.connected = true;
                        $rootScope.overlayloading = false;
                    }, function errorCallback(response) {
                        $toaster.create({
                            type: "error",
                            text: $scope.translate("login_msg_no_connection")
                        });
                    });
            }
        };
        $scope.signup = function signup(name, email, password, confirmationPassword) {
            var newUser = {};
            if (password !== confirmationPassword) {
                return;
            }
            newUser.name = name;
            newUser.email = email;
            newUser.password = password;

            $api.signup(newUser)
                .then(function successCallback(response) {
                    location.hash = "#!/login";
                    $toaster.create({
                        type: 'success',
                        text: $scope.translate('signup_success_msg'),
                    });
                }, function errorCallback(response) {
                    $toaster.create({
                        type: 'success',
                        text: $scope.translate(response),
                    });
                });
        };
        $rootScope.$on('$viewContentLoaded', function () {});
    }
]);
