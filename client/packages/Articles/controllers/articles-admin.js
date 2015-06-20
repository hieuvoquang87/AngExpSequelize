/**
 * Created by hieuvo on 5/13/15.
 */
angular.module('Articles').controller('ArticlesAdminController', ['$scope', '$location', function ($scope, $location) {

    $scope.isActive = function (route) {
        return route === $location.path();
    };
    function init() {

    };


    init();
}]);