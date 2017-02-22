var app = angular.module("umovie-app");
app.run([
    "$rootScope",
    "$cookies",
    function ($rootScope, $cookies) {
        $rootScope.lang = $cookies.get("lang");
        if ($rootScope.lang == null) {
            $cookies.put("lang", "en");
            $rootScope.lang = "en";
        }

        var dictionnary = {
            "actorcategory": {
                "en": "Category : Comedy",
                "fr": "Catégorie : Comédie"
            },
            "banner": {
                "en": "Banner",
                "fr": "Bannière"
            },
            "bannersubtitle": {
                "en": "Watch different.",
                "fr": "Regardez autrement."
            },
            "category": {
                "en": "Category",
                "fr": "Catégorie"
            },
            "confirm_password": {
                "en": "Confirm password",
                "fr": "Confirmer mot de passe"
            },
            "email": {
                "en": "Email",
                "fr": "Email"
            },
            "follow-block-text": {
                "en": "Don't miss any series of yours thanks to your Watchlists",
                "fr": "Ne ratez jamais vos séries favorites grâce à vos watchlists"
            },
            "follow-block-title": {
                "en": "Follow",
                "fr": "Suivez"
            },
            "footer": {
                "en": "Footer",
                "fr": "Bas de page"
            },
            "footer-contact-1": {
                "en": "Carrier piegon",
                "fr": "Pigeon voyageur"
            },
            "footer-contact-2": {
                "en": "Bus 800 : bus stop Laval University, Pouliot block (We are often at ASETIN office, ask for it)",
                "fr": "Ligne 800 : arrêt Université Laval, pavillon Pouliot (On est souvent a l'ASETIN, demandez pour trouver)"
            },
            "footer-contact-text": {
                "en": "To contact us",
                "fr": "Pour nous contacter"
            },
            "footer-information": {
                "en": "Information",
                "fr": "Informations"
            },
            "footer-information-text": {
                "en": "Every data are provided by Apple Inc. This project has been created within a pedagogical aim.",
                "fr": "Toutes les données proviennents de Apple Inc. Ce projet a été créé dans un cadre pédagogique."
            },
            "home": {
                "en": "Home",
                "fr": "Accueil"
            },
            "infofilm_type_film": {
                "en": "Rating",
                "fr": "Type de film"
            },
            "login": {
                "en": "Log in",
                "fr": "Se connecter"
            },
            "logout": {
                "en": "Log out",
                "fr": "Se déconnecter"
            },
            "moreinformation": {
                "en": "More information",
                "fr": "Plus d'information"
            },
            "moviedate": {
                "en": "Released",
                "fr": "Date de sortie"
            },
            "name": {
                "en": "Name",
                "fr": "Nom"
            },
            "next": {
                "en": "Next",
                "fr": "Suivant"
            },
            "password": {
                "en": "Password",
                "fr": "Mot de passe"
            },
            "password_message": {
                "en": "Password must contain at least 8 characters, an uppercase and a lowercase letter.",
                "fr": "Le mot de passe doit contenir au moins 8 caractères, une majuscule et une minuscule."
            },
            "presentation": {
                "en": "Presentation",
                "fr": "Presentation"
            },
            "presentationtitle": {
                "en": "In summary...",
                "fr": "En résumé..."
            },
            "previous": {
                "en": "Previous",
                "fr": "Précédent"
            },
            "search": {
                "en": "Search",
                "fr": "Rechercher"
            },
            "settings": {
                "en": "Settings",
                "fr": "Paramètres"
            },
            "share-block-text": {
                "en": "Share your watchlists with your friends",
                "fr": "Partagez vos watchlists avec vos amis"
            },
            "share-block-title": {
                "en": "Share",
                "fr": "Share"
            },
            "signup": {
                "en": "Sign up",
                "fr": "S'inscrire"
            },
            "watch": {
                "en": "Watch",
                "fr": "Regardez"
            },
            "watch-block-text": {
                "en": "Watch your favorite movies and series",
                "fr": "Visionnez vos films et vos séries préférées"
            },
            "watch-block-title": {
                "en": "Watch",
                "fr": "Regardez"
            },
            "watchlist": {
                "en": "Watchlist",
                "fr": "Watchlist"
            },
            "watchlists": {
                "en": "Watchlists",
                "fr": "Watchlists"
            }
        };

        $rootScope.translate = function (expr) {
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
