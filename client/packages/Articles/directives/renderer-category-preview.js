/**
 * Created by hieuvo on 5/16/15.
 */
angular.module('Articles').directive('rendererCategoryPreview', function () {
    return {
        restrict: 'A',
        templateUrl: 'packages/Articles/views/renderer-category-preview.html',
        controller: 'RendererCategoryPreviewController',
        scope: {
            data: '='
        }
    };
}).controller('RendererCategoryPreviewController', ['$scope', '$state', 'ArticlesStore',
    function ($scope, $state, ArticlesStore){

        $scope.updateArticle = function () {

        };
    }]);