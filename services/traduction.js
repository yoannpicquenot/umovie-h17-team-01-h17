var app = angular.module("umovie-app");
app.run([
    "$rootScope",
    "$cookies",
    function($rootScope, $cookies) {
        $rootScope.lang = $cookies.get("lang");
        if ($rootScope.lang == null) {
            $cookies.put("lang", "en");
            $rootScope.lang = "en";
        }

        var dictionnary = {
            "actorcategory" : {
              "fr": "Catégorie : Comédie",
              "en": "Category : Comedy"
            },
            "banner": {
                "fr": "Bannière",
                "en": "Banner"
            },
            "bannersubtitle": {
                "fr": "Regardez autrement.",
                "en": "Watch different."
            },
            "category": {
                "fr": "Catégorie",
                "en": "Category"
            },
            "follow-block-title": {
                "fr": "Suivez",
                "en": "Follow"
            },
            "follow-block-text": {
                "fr": "Ne ratez jamais vos séries favorites grâce à vos watchlists",
                "en": "Don't miss any series of yours thanks to your Watchlists"
            },
            "home": {
                "fr": "Accueil",
                "en": "Home"
            },
            "footer": {
                "fr": "Bas de page",
                "en": "Footer"
            },
            "footer-information": {
                "fr": "Informations",
                "en": "Information"
            },
            "footer-information-text": {
                "fr": "Toutes les données proviennents de Apple Inc. Ce projet a été créé dans un cadre pédagogique.",
                "en": "Every data are provided by Apple Inc. This project has been created within a pedagogical aim."
            },
            "footer-contact-1": {
                "fr": "Pigeon voyageur",
                "en": "Carrier piegon"
            },
            "footer-contact-2": {
                "fr": "Ligne 800 : arrêt Université Laval, pavillon Pouliot (On est souvent a l'ASETIN, demandez pour trouver)",
                "en": "Bus 800 : bus stop Laval University, Pouliot block (We are often at ASETIN office, ask for it)"
            },
            "footer-contact-text": {
                "fr": "Pour nous contacter",
                "en": "To contact us"
            },
            "infofilm_type_film": {
                "fr": "Type de film",
                "en": "Rating"
            },
            "logout": {
                "fr": "Se déconnecter",
                "en": "Log out"
            },
            "moviedate" : {
              "fr": "Date de sortie",
              "en": "Released"
            },
            "moreinformation": {
                "fr": "Plus d'information",
                "en": "More information"
            },
            "presentation": {
                "fr": "Presentation",
                "en": "Presentation"
            },
            "presentationtitle": {
                "fr": "En résumé...",
                "en": "In summary..."
            },
            "share-block-title": {
                "fr": "Share",
                "en": "Share"
            },
            "share-block-text": {
                "fr": "Partagez vos watchlists avec vos amis",
                "en": "Share your watchlists with your friends"
            },
            "search": {
                "fr": "Rechercher",
                "en": "Search"
            },
            "settings": {
                "fr": "Paramètres",
                "en": "Settings"
            },
            "watch": {
                "fr": "Regardez",
                "en": "Watch"
            },
            "watch-block-title": {
                "fr": "Regardez",
                "en": "Watch"
            },
            "watch-block-text": {
                "fr": "Visionnez vos films et vos séries préférées",
                "en": "Watch your favorite movies and series"
            },
            "watchlist": {
                "fr": "Watchlist",
                "en": "Watchlist"
            },
        }

        $rootScope.translate = function(expr) {
            if (dictionnary[expr] == null) {
                return "Please add translation for : " + expr;
            }
            return dictionnary[expr][$rootScope.lang];
        };


        $rootScope.changeLanguage = function changeLanguage() {
            $cookies.put("lang", $rootScope.lang == 'en' ? 'fr' : 'en');

            location.reload();
        };
    }
]);
