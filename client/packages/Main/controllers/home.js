'use strict';

angular.module('myApp.views')
    .controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.btnClick = function () {
            $http.get($scope.path).
            success(function (data, status, headers, config) {
                $scope.result = data;
            }).
            error(function (data, status, headers, config) {

            });
        };

        $scope.btnCreateClick = function () {
            $http.post($scope.path, {name: $scope.categoryName}).
            success(function (data, status, headers, config) {
                $scope.result = data;
            }).
            error(function (data, status, headers, config) {
                
            });
        };

}]);