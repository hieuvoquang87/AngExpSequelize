/**
 * Created by hieuvo on 5/4/15.
 */
angular.module('Articles').directive('articlePreviewRender', function () {
    return {
        restrict: 'A',
        templateUrl: 'packages/Articles/views/renderer-article-preview.html',
        controller: 'ArticlePreviewRenderController',
        scope: {
            data: '='
        }
    };
}).controller('ArticlePreviewRenderController', ['$scope', '$state', 'ArticlesStore',
    function ($scope, $state, ArticlesStore){
        ArticlesStore.addObserver($scope, [
            {remoteProperty: ArticlesStore.UPDATING_ARTICLE, localProperty: 'selectedArticle'}
        ]);
        $scope.updateArticle = function () {
            var path = '/articles/admin/articles/update/' + $scope.data._id;
            $scope.selectedArticle = $scope.data;
            $state.go('articles.admin.articles.update');
        };
}]);