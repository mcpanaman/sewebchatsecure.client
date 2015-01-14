//ChatService
chatApp.factory('ChatService', function($http){
    var srv = {};

    srv._baseUrl = 'http://sewebchat-secureapi.azurewebsites.net';
    //srv._baseUrl = 'http://localhost:50256';

    srv.getChatHistory = function(){
        return $http.get(srv._baseUrl + '/api/Chat/');
    };

    srv.sendMessage = function(message){
        return $http.post(srv._baseUrl + "/api/Chat/", message);
    };

    // Public API of UserService
    return {
        getChatHistory : function(){
            return srv.getChatHistory();
        },
        sendMessage : function(message){
            return srv.sendMessage(message);
        }
    };
});