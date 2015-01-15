chatApp.factory('UserService', function($http){
    var srv = {};

    srv._baseUrl = 'http://sewebchat-secureapi.azurewebsites.net';
    //srv._baseUrl = 'http://localhost:50256';

    srv.getActiveUsers = function(){
        return $http.get(srv._baseUrl + '/api/User?state=active');
    };

    // Public API of UserService
    return {
        getActiveUsers: function(){
            return srv.getActiveUsers();
        }
    };
});