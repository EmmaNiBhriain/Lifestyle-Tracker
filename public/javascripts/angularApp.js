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
app.service('workoutService', function(){

    var workoutService = {
        _id:'',
        duration: 0,
        description: '',
        time: '',
        date: '',  //use the mongoose data type 'Date'
        intensity: '0'
        //userid: 123458,
        //usertoken: String,
    };
    return workoutService;
});

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

    //route for the add workout page
        .when('/addworkout',{
            templateUrl: 'pages/addworkout.ejs',
            controller: 'workoutsController'
        })

    //route for the workouts page
        .when('/workouts',{
            templateUrl : 'pages/workouts.ejs',
            controller : 'workoutsController'
        })

    //route for the edit workout page
    .when('/viewworkout',{
        templateUrl: 'pages/viewworkout.ejs',
        controller: 'viewController'
    })

    //route for the edit workout page
    .when('/editworkout',{
        templateUrl: 'pages/editworkout.ejs',
        controller: 'viewController'
    });

});