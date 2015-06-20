'use strict';

// Declare app level module which depends on views, and components

angular.module('myApp').
    config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/home");
            $stateProvider
                .state('home', {
                    url: "/home",
                    templateUrl: 'packages/Main/views/home.html',
                    controller: 'HomeCtrl'
                })
                .state('view2', {
                    url: "/view2",
                    templateUrl: 'packages/Main/views/view2.html',
                    controller: 'View2Ctrl'
                });
        }
    ]);
