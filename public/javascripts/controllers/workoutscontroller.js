var app = angular.module('LifestyleTracker');

app.controller('workoutsController', ['$scope','$http', '$location', 'workoutService', 'userService', function($scope, $http, $location, workoutService, userService){
    //display a message
    //$scope.message = 'Log in to add a workout';
    //workoutService.userid = userService.userid;

    if(userService.userid != null){
        $scope.flag = true;
        console.log('valid');
    }
    else{
        $scope.flag = false;
        $scope.message="Please sign in to view content";
    }
    console.log('flag: ' + true);

    $scope.formData={};
    $scope.formData.workouttype="Other";
    $scope.formData.intensity=1;

    $scope.searchData={};
    $scope.searchData.workouttype = "Cardio";
    $scope.searchData.intensity = 1;
    //$scope.formData.userid = 109186492055068213998;
    //$scope.userid=userService.userid;

    $scope.addWorkout = function(){
        date = $scope.formData.date;
        date = date.toISOString();
        $scope.formData.userid = userService.userid;
        //$scope.formData.userid = userService.userid;
        //workoutService.userid = userService.userid;
        //workoutService.intensity = $scope.formData.intensity;
        //workoutService._id = $scope.formData._id;
        //workoutService.userid = userService.userid;
        //workoutService.userid = userService.userid;
        //workoutService.userid = userService.userid;
        console.log('date: ' + $scope.formData.date);
        console.log('User id is ' + userService.userid);
        console.log('User id is ' + workoutService.userid);
        console.log('workout id' + workoutService._id);
        console.log('form data ' + $scope.formData.userid);
        //$scope.formData.append("userid", userService.userid);

        //$scope.formData.userid = 123458;


        //workoutService._id = $scope.formData._id;
        console.log(workoutService._id);
        //$scope.formData.workouttype = "cardio";

        $http.post('/workouts', $scope.formData)
            .success(function(data){
                $scope.workouts = data;
                console.log($scope.workouts);
                console.log(data._id);
                $location.path('/workouts');
                console.log(data);


                //add the user id field to the newly created workout
                //$http.put('/workouts/' + $scope.formData.userid + '/userid', JSON.stringify({userid : userService.userid}));
            })
            .error(function(data){
                console.log('Error: '+ data);
            });



    };

    findAll();

    function findAll(){
        $http.get('/users/'+userService.userid+'/workouts')
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
        workoutService.userid = workout.userid;
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