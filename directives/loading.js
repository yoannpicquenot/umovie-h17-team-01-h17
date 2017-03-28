var app = angular.module('umovie-app');

app.directive('loading', [
    function () {
        return {
            templateUrl: './directives/loading.template.html'
        };
    }
]);
