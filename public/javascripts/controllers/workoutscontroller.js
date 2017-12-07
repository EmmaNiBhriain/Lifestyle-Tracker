var app = angular.module('LifestyleTracker');

app.controller('workoutsController', ['$scope','$http', '$location', function($scope, $http, $location){
    //display a message
    //$scope.message = 'Log in to add a workout';
    formData={};

    $scope.addWorkout = function(){
        //$scope.formData.usertoken=userService.usertoken;
        $scope.formData.userid = 123458;
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
}
]);