var app = angular.module("umovie-app");

app.controller("WatchListsCtrl", [
    "$rootScope",
    "$scope",
    function($rootScope, $scope) {
        $rootScope.tabActive = "watchlists";

        $scope.watchlist = [
        	{
        		"cover": "http://img08.cdn.cinoche.com/images/fd020979cad837c067e6e45d8ed34f22.jpg",
        		"title": "Finding Nemo",
        		"summary": "Dans les eaux tropicales de la Grande Barrière de corail, un poisson-clown du nom de Marin mène une existence paisible avec son fils unique, Nemo. Redoutant l'océan et ses risques imprévisibles, il fait de son mieux pour protéger son fils. Comme tous les petits poissons de son âge, celui-ci rêve pourtant d'explorer les mystérieux récifs. Lorsque Nemo disparaît, Marin devient malgré lui le héros d'une quête unique et palpitante. Le pauvre papa ignore que son rejeton à écailles a été emmené jusque dans l'aquarium d'un dentiste. Marin ne s'engagera pas seul dans l'aventure : la jolie Dory, un poisson-chirurgien bleu à la mémoire défaillante et au grand coeur, va se révéler d'une aide précieuse. Les deux poissons vont affronter d'innombrables dangers, mais l'optimisme de Dory va pousser Marin à surmonter toutes ses peurs."
        	},
        ];
    }
]);