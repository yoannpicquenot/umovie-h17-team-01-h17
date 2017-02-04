/**
 * Created by Philippe on 2017-01-18.
 *
 */

var app = angular.module("umovie-app");

app.controller("TvShowCtrl", [
    '$rootScope',
    '$scope',
    function($rootScope, $scope) {

        $rootScope.tabActive = "tvshow";
        $scope.tvShow = {
            "title" : "Heroes",
            "genre" : "Action",
            "releaseDate" : "2006",
            "rating" : "General",
            "description" : "In Manhattan, Peter Petrelli is the younger brother Nathan Petrelli an overly ambitious and unscrupulous candidate for the next New York congressman, and he dreams and believes that he can fly. He decides to prove his theory and jumps from the roof of a building in an alley and his brother flies and saves him. In Texas, cheerleader Claire Bennet learns that she is literally indestructible and can not harm herself or die. She saves a fireman in a fire in a train, but does not take the credit. In Tokyo, Hiro Nakamura believes he can control time and space continuum. In India, Mohinder Suresh moves to the Brooklyn, New York, where his father, that was researching a secret project called Genesis about genome and DNA, is killed in a taxi cab. In Lower Manhattan, the painter Isaac Mendez paints pictures of the future. In Las Vegas, stripper Niki Sanders borrows $30,000 from a powerful local mobster to get her young son into school, and does not have the money to pay her loan. She sees a different image of her in the mirror, and when two gangsters come to her house to collect the money, one of them hits her and she faints. Later Nikki wakes up, and the two thugs are dead... literally torn apart by her evil alter ego.",
            "episodes" : [
                {
                    "title" : "Genesis",
                    "description": "In October 2006, people around the world discover that they have superpowers. High school student Claire Bennet finds herself spontaneously regenerating. Heroin addict Isaac Mendez can precognitively paint future events, including a nuclear explosion in New York City. Japanese office worker Hiro Nakamura is able to teleport and time travel. Nurse Peter Petrelli experiences visions that convince him he can fly. Indian scientist Mohinder Suresh travels to New York to continue his recently deceased father's work by finding these people. A mobster named Daniel Linderman sends two men to Niki Sanders's home to collect a loan that she has not repaid. Niki blacks out and later finds the men dead.",
                    "runtime" : "53 min",
                    "cover" : "http://images.static-bluray.com/reviews/532_5.jpg"
                },{
                    "title" : "Don't look back",
                    "description": "Hiro time travels more than a month into the future of New York City; there he finds Isaac dead, and witnesses a nuclear explosion. Politician Nathan Petrelli tries to dismiss his recent self-propelled flight, and lies to his brother Peter about it. Policeman Matt Parkman uses his telepathic powers to find a girl named Molly Walker, whose parents have been recently murdered by a serial killer called Sylar.",
                    "runtime" : "42 min",
                    "cover" : "https://tv-fanatic-res.cloudinary.com/iu/s--aEKodPUz--/t_teaser_wide/f_auto,fl_lossy,q_75/v1371126399/parkman-and-claire-realization.png"
                },{
                    "title" : "One giant leap",
                    "description": "Peter begins to date Isaac's ex-girlfriend Simone. Hiro returns to the present and seeks the help of his friend, Ando Masahashi, to save New York from the upcoming explosion. Mohinder, who has been working with his father's neighbor Eden, discovers that Sylar was connected to his father. Claire's classmate Brody attempts to rape her and accidentally kills her in the process.",
                    "runtime" : "43 min",
                    "cover" : "https://tv-fanatic-res.cloudinary.com/iu/s--HhvIMDCH--/t_full_episode_show/f_auto,fl_lossy,q_75/v1371126454/genesis-photo.png"
                },{
                    "title" : "Collision",
                    "description": "Matt is kidnapped by Claire's father and a Haitian. Hiro and Ando gamble in Vegas using Hiro's ability to freeze time, but are soon evicted from the hotel and assaulted by their opponents. Niki's alter ego Jessica has sex with Nathan to repay her debt to Linderman. After she regenerates from her mortal injuries, Claire intentionally takes Brody for a car ride into a brick wall.",
                    "runtime" : "43 min",
                    "cover" : "http://reallylatereviews.com/wp-content/uploads/2013/07/Finale.jpg"
                },{
                    "title" : "Hiros",
                    "description": "A Hiro from the future—who can speak English fluently—appears to Peter. He instructs Peter to save a cheerleader in order to save the world. Niki has no memories of the night before. Claire tells her father about Brody and her father secretly instructs the Haitian to erase Brody's mind.",
                    "runtime" : "43 min",
                    "cover" : "http://cdn-static.sidereel.com/episodes/421335/featured_2x/308908.jpg"
                }]
        };

        
    }
]);