/**
 * Created by hieuvo on 5/14/15.
 */
angular.module('Articles').controller('AdminArticlesInfoController', ['$scope', 'ArticlesStore',
    function ($scope, ArticlesStore) {
        function init() {
            ArticlesStore.addObserver($scope, [
                {remoteProperty: ArticlesStore.ARTICLE_LIST, localProperty: 'articleData'}
            ]);
            $scope.articlesGridOptions = {
                data: $scope.articleData,
                columnDefs: [
                    {field: 'title'},
                    {field: 'author'},
                    {field: 'createdDate'},
                    {field: 'lastUpdatedDate'}
                ]
            }
        };


        init();
    }]);