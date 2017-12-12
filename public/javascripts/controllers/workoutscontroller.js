var app = angular.module('LifestyleTracker');

app.controller('workoutsController', ['$scope','$http', '$location', 'workoutService', function($scope, $http, $location, workoutService){
    //display a message
    //$scope.message = 'Log in to add a workout';
    formData={};

    $scope.addWorkout = function(){
        //$scope.formData.usertoken=userService.usertoken;
        //$scope.formData.userid = 123458;
        //$scope.formData.workouttype = "cardio";
        $http.post('/workouts',$scope.formData)
            .success(function(data){
                $scope.workouts = data;
                $location.path('/workouts');
                console.log(data);
            })
            .error(function(data){
                console.log('Error: '+ data);
            });
    };

    findAll();

    function findAll(){
        $http.get('/users/123457/workouts')
            .success(function(data){
                $scope.workouts = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
    };

    $scope.delete = function(id){
        if(confirm("Are you sure you want to delete this Donation?")){
            console.log("deleting id: " + id);

            $http.delete('/workouts/'+id)
                .success(function(data){
                    console.log(data);
                    findAll();
                })
                .error(function(data){
                    console.log('Error: ' + data);
                });
        }
    };


   /* function findOne(workout){
        workoutService._id = workout._id;
        workoutService.intensity = 9;
        //workoutService.intensity = workout.intensity;
        console.log(workoutService.id);
        console.log(workout.id);
        workout = $http.get('/workouts/' + workoutService._id)
            .success(function (data) {
                console.log(data);
                $scope.workouts = data;
                $location.path('/editworkout');
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
    };*/

   //Place the values of the workout in a service object and send to separate controller that gets called when rendering the edit page
    $scope.viewWorkout = function(workout){
       //findOne(workout);
        workoutService._id = workout._id;
        workoutService.time = workout.time ;
        workoutService.date = workout.date;
        workoutService.workouttype = workout.workouttype;
        workoutService.duration = workout.duration;
        workoutService.description = workout.description;
        workoutService.intensity = workout.intensity;
        console.log(workoutService.id);
        console.log(workout.id);
        workout = $http.get('/workouts/' + workoutService._id)
            .success(function (data) {
                console.log(data);
                $scope.workouts = data;
                $location.path('/viewworkout');
                //$scope.editIntensity(workout);
            })
            .error(function(data){
                console.log('Error: ' + data);
            });

    };
}
]);