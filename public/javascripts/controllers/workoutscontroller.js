var app = angular.module('LifestyleTracker');

app.controller('workoutsController', ['$scope', function($scope){
    //display a message
    $scope.message = 'These are all your workouts';
}
]);