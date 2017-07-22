var dondev2App = angular.module('dondev2App',['ngRoute','ngMap','ui.materialize','pascalprecht.translate']);

$(document).ready(function(){
  	new WOW().init();
});

dondev2App.config(function($interpolateProvider, $locationProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
})

dondev2Apps.config(['$translateProvider', function ($translateProvider) {
       $translateProvider
         .translations('es', translations_es)
         .preferredLanguage(localStorage.getItem('lang'));

}]);

dondev2App.filter('unique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
});
