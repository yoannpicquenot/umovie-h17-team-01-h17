var app = angular.module("umovie-app");
var nb = 0;

app.factory("$toaster", [
    function () {
        return {
            create: function (options) {
                if (nb == 0) {
                    $('body').prepend(
                        `
                        <div class="toaster-wrapper"></div>
                        `);
                } else if (nb > 2) {
                    return;
                }
                ++nb;
                var html =
                    `
                    <div class="toaster ${options.type} toaster${nb}">
                        <div><h5><b>${options.text}</b></h5></div>
                    </div>
                `;
                $(".toaster-wrapper").append(html);
                $(`.toaster.${options.type}.toaster${nb}`).fadeTo(400, 1).click(function () {
                    $(`.toaster.${options.type}.toaster${nb}`).fadeTo(400, 0, function () {
                        $(`.toaster.${options.type}.toaster${nb}`).remove();
                        --nb;
                    });
                });
                setTimeout(function () {
                    $(`.toaster.${options.type}.toaster${nb}`).fadeTo(400, 0, function () {
                        $(`.toaster.${options.type}.toaster${nb}`).remove();
                        --nb;
                        if (nb == 0) {
                            $('.toaster-wrapper').remove();
                        }
                    });
                }, 4000);
            }
        };
    }
]);
