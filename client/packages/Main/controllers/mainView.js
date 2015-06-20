angular.module('myApp.views').directive('mainView', function(){
    return {
        restrict: 'A',
        templateUrl: 'packages/Main/views/main-view.html',
        controller: 'MainViewController'
    };
})
        .controller('MainViewController',['$scope', function($scope){
                
        }]);


