var app = angular.module('LifestyleTracker', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider

    //route for the home page
        .when('/', {
        templateUrl : 'pages/home.ejs',
        controller : 'mainController'
    })

    //route for the user profile page
        .when('/profile', {
            templateUrl : 'pages/profile.ejs',
            controller : 'profileController'
    })
    //route for the workouts page
        .when('/workouts',{
            templateUrl : 'pages/workouts.ejs',
            controller : 'workoutsController'
        });

});