/*var app = angular.module('LifestyleTracker');

app.controller('signinController', ['$scope', function($scope){
    //display a message
    $scope.message = 'This is the user data';
    $scope.gmail = {
        username : "",
        email : ""
    };
    $scope.onSignIn = function(){
        var params = {
            'clientid' : '1067797082655-0q0enea900rbk7oonptcb0bet1oi513o.apps.googleusercontent.com',
            'cookiepolicy' : 'single_host_origin',
            'callback': function(result){
                if(result['status']['signed_in']){
                    var request = gapi.client.plus.people.get(
                        {
                            'userId':'me'
                        }
                    );
                    request.execute(function(reap){
                        $scope.$apply(function(){
                            $scope.gmail.username = reap.displayName;
                            $scope.gmail.email = reap.emails[0].value;
                        });
                    })

                }

            },
            'approvalprompt': 'force',
            'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
        };

        gapi.auth.signIn(params);
    }
}
]);*/



