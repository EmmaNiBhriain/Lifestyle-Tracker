var app = angular.module('LifestyleTracker', ['ngRoute']);


//Create a user service for use to inject data about the user
app.service('userService', function(){
    var userService = {
        usertoken: null,
        username: 'Log In',
        useremail: 'email',
        googlephoto: './images/runner.jpg'
    };
    return userService;
});

//create a workout service for use to inject data about a workout
/*app.service('workoutService', function(){

});*/

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