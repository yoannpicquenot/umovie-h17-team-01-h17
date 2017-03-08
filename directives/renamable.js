var app = angular.module('umovie-app');

app.directive('renamable', function($compile) {
    return {
        scope: {
            model: '=model',
        },
        link: function(scope, element, attributes) {
            var templateActive = $compile('<input type="text" ng-model="model.name" class="renamable" tabindex="-1" required>')(scope);
            var templateNonActive = $compile('<a class="renamable">{{ model.name }} <i class="material-icons left">mode_edit</i></a>')(scope);

            function bindClick() {
                element.on("click", function() {
                    scope.$apply(function() {
                        element.html(templateActive).unbind('click').children()[0].focus();
                    });
                });
            }

            element.on('focusout', function() {
                scope.$apply(function() {
                    element.html(templateNonActive);
                    bindClick();
                });
            });

            bindClick();
        },
        template: '<a class="renamable">{{ model.name }} <i class="material-icons left">mode_edit</i></a>',
    };
});
