var app = angular.module('LifestyleTracker');

app.controller('viewController', ['$scope','$http', '$location', 'workoutService', 'userService', function($scope, $http, $location, workoutService, userService){
    //display a message
    //$scope.message = 'Log in to add a workout';

    if(userService.userid != null){
        $scope.flag = true;
        console.log('valid');
    }
    else{
        $scope.flag = false;
        $scope.message="Please sign in to access site content";
    }

    setup();
    //use a workoutService to sent the data of the selected workout to the update page
    function setup(){
        //console.log(workoutService.intensity);
        $scope.workout = workoutService;
    };
    
    $scope.edit = function (workout) {
        $location.path('/editworkout');
    };

    formData={};

    $scope.updateWorkout = function(){
        console.log($scope.formData.intensity);

        //Update intensity
        if($scope.formData.intensity){
            workoutService.intensity = $scope.formData.intensity;
            $http.put('/workouts/' + workoutService._id + '/intensity', JSON.stringify({intensity : workoutService.intensity}))
        .success(function(data){
                console.log(data);
                $location.path('/viewworkout');
            })
                .error(function(data){
                    console.log('Error: ' + data);
                })
        }

        //update the time
        if($scope.formData.time){
            workoutService.time = $scope.formData.time;
            $http.put('/workouts/' + workoutService._id + '/time', JSON.stringify({time : workoutService.time}))
                .success(function(data){
                    console.log(data);
                    $location.path('/viewworkout');
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })
        }

        //update the date
        if($scope.formData.date){
            workoutService.date = $scope.formData.date;
            $http.put('/workouts/' + workoutService._id + '/date', JSON.stringify({date : workoutService.date}))

                .success(function(data){
                    console.log(data);
                    $location.path('/viewworkout');
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })
        }

        //update the workout type
        if($scope.formData.workouttype){
            workoutService.workouttype = $scope.formData.workouttype;
            $http.put('/workouts/' + workoutService._id + '/workouttype', JSON.stringify({workouttype : workoutService.workouttype}))

                .success(function(data){
                    console.log(data);
                    $location.path('/viewworkout');
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })
        }

        //update the duration of the workout
        if($scope.formData.duration){
            workoutService.duration = $scope.formData.duration;
            $http.put('/workouts/' + workoutService._id + '/duration', JSON.stringify({duration : workoutService.duration}))

                .success(function(data){
                    console.log(data);
                    $location.path('/viewworkout');
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })
        }

        //update the description of the workout
        if($scope.formData.description){
            workoutService.description = $scope.formData.description;
            $http.put('/workouts/' + workoutService._id + '/description', JSON.stringify({description : workoutService.description}))

                .success(function(data){
                    console.log(data);
                    $location.path('/viewworkout');
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })
        }
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