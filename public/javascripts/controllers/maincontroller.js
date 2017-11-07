var app = angular.module('LifestyleTracker');

app.controller('mainController', ['$scope', function($scope){
    //display a message
    $scope.message = 'Track Your Workouts Here';
}
]);