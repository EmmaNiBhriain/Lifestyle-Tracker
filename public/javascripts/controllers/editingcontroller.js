var app = angular.module('LifestyleTracker');

app.controller('editingController', ['$scope','$http', '$location', 'workoutService', function($scope, $http, $location, workoutService){
    //display a message
    //$scope.message = 'Log in to add a workout';

    setup();
    //use a workoutService to sent the data of the selected workout to the update page
    function setup(){
        //console.log(workoutService.intensity);
        $scope.workout = workoutService;
    };

    $scope.editIntensity = function(workout){
        $http.put('/workouts/' + workoutService._id + '/intensity', JSON.stringify({intensity : workoutService.intensity}))
            .success(function(data){
                console.log(data);
                findAll();
            })
            .error(function(data){
                console.log('Error: ' + data);
            })
    }
}
]);