var app = angular.module('Lifestyle Tracker');

app.controller('mainController', ['$scope', function($scope){
    //display a message
    $scope.message = 'Track Your Workouts Here';
}
]);