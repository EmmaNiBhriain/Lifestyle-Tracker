var app = angular.module('LifestyleTracker');

app.controller('mainController', ['$scope', 'userService', '$route', '$templateCache', function($scope, userService, $route, $templateCache){
    //display a message
    $scope.title = 'Track Your Workouts Here';
    $scope.googlephoto = './images/runner.jpg';

    $scope.loggedIn = function(googleUser){
        var profile = googleUser.getBasicProfile();
        var id_token = googleUser.getAuthResponse().id_token;
        var id = profile.getId();
        $scope.username = profile.getName();
        console.log($scope.username);
        $scope.useremail = profile.getEmail();
        $scope.googlephoto = profile.getImageUrl();
        userService.usertoken = id;
        userService.username = $scope.username;
        userService.googlephoto = $scope.googlephoto;

        $scope.$apply();
        console.log('Token: ' + userService.usertoken);
        console.log('mainController loggedIn Called with : userService Profile ' + userService.username);
        console.log('Current templateUrl: ' + $route.current.templateUrl);

        var currentPageTemplate = $route.current.templateUrl;
        $templateCache.remove(currentPageTemplate);
        $route.reload();
    };

    $scope.loggedOut = function(){
        userService.usertoken = null;
        userService.username = null;
        userService.useremail = null;
        userService.googlephoto = './images/runner.jpg';
        $scope.$apply();

       // var currentPageTemplate = $route.current.templateUrl;
        //$templateCache.remove(currentPageTemplate);
        $route.reload();

    }
   // $scope.message = 'Track Your Workouts Here';
}
]);