var app = angular.module("umovie-app");

app.controller("WatchListsCtrl", [
    "$rootScope",
    "$scope",
    function($rootScope, $scope) {
        $rootScope.tabActive = "watchlists";

        $scope.watchlists = [
        {
            name: "Disney",
            movies: [{
                cover: "http://img08.cdn.cinoche.com/images/fd020979cad837c067e6e45d8ed34f22.jpg",
                title: "Le monde de Nemo",
                summary: "Dans les eaux tropicales de la grande barrière de corail, Marin, un poisson clown, mène une existence paisible avec son fils unique, Nemo. Redoutant l'océan, il fait de son mieux pour protéger son fils. Comme tous les petits poissons, celui-ci...",
                link: '<a href="https://geo.itunes.apple.com/ca/movie/le-monde-de-nemo/id369847247?mt=6" style="display:inline-block;overflow:hidden;background:url(//linkmaker.itunes.apple.com/assets/shared/badges/en-us/itunes-lrg.svg) no-repeat;width:110px;height:40px;background-size:contain;"></a>'
            }, {
                "cover": "http://img09.cdn.cinoche.com/images/d5d787d406d33213c32fbe6a14d37853.jpg"
            }, {
                "cover": "http://is1.mzstatic.com/image/thumb/Video62/v4/a3/ed/d6/a3edd6da-1466-863d-b1aa-da1f62dfe240/source/6000x4000bb.jpg"
            }, {
                "cover": "http://is3.mzstatic.com/image/thumb/Video3/v4/77/7a/d0/777ad094-7cf9-2f95-3c46-d9ed310ed1b6/source/6000x4000bb.jpg"
            }, {
                "cover": "http://is5.mzstatic.com/image/thumb/Video6/v4/54/46/bd/5446bd57-9ffb-035a-da73-087629e888e2/source/6000x4000bb.jpg"
            }]
        }, {
            name: "Action",
            movies: [{
                "cover": "http://img02.cdn.cinoche.com/images/e444447cdffe5547137dfac460b7aad3.jpg"
            }, {
                "cover": "http://img07.cdn.cinoche.com/images/ecfe3a1159c8a2503eeccb0a85a9a13e.jpg"
            }, {
                "cover": "http://is3.mzstatic.com/image/thumb/Video3/v4/7c/1b/9c/7c1b9c86-3222-00fc-7887-46977c6a8545/source/6000x4000bb.jpg"
            }, {
                "cover": "http://is3.mzstatic.com/image/thumb/Video49/v4/70/15/84/701584ac-d1ce-3f9c-2a33-fb82953ac61f/source/6000x4000bb.jpg"
            }, {
                "cover": "http://is4.mzstatic.com/image/thumb/Video5/v4/91/b9/2c/91b92c17-484c-5afe-d6d8-6366a4958d18/source/6000x4000bb.jpg"
            }]
        }];

        $rootScope.$on('$viewContentLoaded', function() {
            $('.modal').modal();
        });

        $scope.loadCarousel = function loadCarousel(watchlist) {
            $('#' + watchlist.name + '-carousel').carousel({
                dist: 0,
                shift: 50,
                padding: 15,
                noWrap: true
            });
        };

        $scope.loadScrollSpy = function loadScrollSpy(watchlist) {
            $('#' + watchlist.name + '-carousel').scrollSpy();
        };


        $scope.openModalinfofilm = function openModalinfofilm() {
            $('#modal1').modal('open');
        };

        $scope.goTo = function goTo(watchlist) {
            var section = (watchlist.name ? '#' + watchlist.name + '-carousel' : 'body');
            $('html,body').stop();
            $('html,body').animate({
                scrollTop: $(section).offset().top
            }, 1000);
        };

        $scope.pressButtonCarousel = function pressButtonCarousel(watchlist, move) {
            $('#' + watchlist.name + '-carousel').carousel(move);
        };

        $scope.goTo('');
    }
]);
