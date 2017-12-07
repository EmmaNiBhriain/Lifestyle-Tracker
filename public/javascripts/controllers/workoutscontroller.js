var app = angular.module('LifestyleTracker');

app.controller('workoutsController', ['$scope','$http', '$location', function($scope, $http, $location){
    //display a message
    //$scope.message = 'Log in to add a workout';
    formData={};

    $scope.addWorkout = function(){
        $scope.formData.usertoken=userService.usertoken;
        //$scope.formData.userid = 3;
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
        $http.get('/users/123458/workouts')
            .success(function(data){
                $scope.workouts = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
    };
}
]);