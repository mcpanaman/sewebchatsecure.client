'use strict';
chatApp.controller('ChatCtrl', function($scope, $interval, $location, UserService, ChatService) {

    //Initial Load of ActiveUsers
    /*UserService.getActiveUsers().then(function(res){
        $scope.onlineUsers = res.data;
    }, function(error){
        console.log('error during getactiveUsers');
    });*/

    //Initial Loading ChatHistory
    ChatService.getChatHistory().then(function(res){
        $scope.messages = res.data;
        $scope.apply();

    });

    //Put in interval, first trigger after 3 seconds
    var intervalPromiseHist = $interval(function() {
        ChatService.getChatHistory().then(function(res) {
            $scope.messages = res.data;
            $scope.apply();

        });
    }, 3000);
    $scope.$on('$destroy', function () { $interval.cancel(intervalPromiseHist); });

    //Put in interval, first trigger after 5 seconds
    /*var intervalPromiseAct = $interval(function(){
        UserService.getActiveUsers().then(function(res){
            $scope.onlineUsers = res.data;
            $scope.apply();
        }, function(error){
            console.log('error during getactiveUsers');
        });
    }.bind(this), 10000);
    $scope.$on('$destroy', function () { $interval.cancel(intervalPromiseAct); });*/

    //SendMessage
    $scope.sendMessage = function() {
        var dateTime = new Date();
        var message = {TimeTicks: dateTime.getTime(), Username: $scope.loggedInUsername, Message: $scope.inputText};
        $scope.messages.push(message);
        ChatService.sendMessage(message);

        //Reset input text
        $scope.inputText = "";
    };

    //Logout
    $scope.logout = function() {
        $scope.loggedInUsername = null;
        $location.path('/login');
    };
});