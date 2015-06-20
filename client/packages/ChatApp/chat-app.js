angular.module('ChatApp')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('/articles', '/articles/main');
            $stateProvider
                .state('chatapp', {
                    url: "/chatapp",
                    templateUrl: 'packages/ChatApp/views/chat-app.html',
                    controller: 'ChatAppController'
                })
            ;
        }]);
