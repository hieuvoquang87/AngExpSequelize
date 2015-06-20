/**
 * Created by hieuvo on 5/13/15.
 */
angular.module('Articles')
    .controller('ArticlesMainController', ['$scope', 'ArticleService', 'ArticlesStore', 'CategoryService',
        function ($scope, ArticleService, ArticlesStore, CategoryService) {
            function init() {
                ArticlesStore.addObserver($scope, [
                    {remoteProperty: ArticlesStore.ARTICLE_LIST, localProperty: 'articles'},
                    {remoteProperty: ArticlesStore.CATEGORY_LIST, localProperty: 'categories'}
                ]);
            };

            $scope.searchArticlesByTitle = function () {
                var queryString = $scope.queryString;
                ArticleService.findArticlesByTitle(queryString,
                    function (results) {
                        $scope.articles = results;
                    }, function (err) {
                        alert('fail to get Articles');
                    });
            };
            init();
        }]);