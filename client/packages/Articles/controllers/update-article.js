/**
 * Created by hieuvo on 5/13/15.
 */
angular.module('Articles').controller('UpdateArticleController', ['$scope', '$state', 'ArticlesStore', 'ArticleService',
    function ($scope, $state, ArticlesStore, ArticleService) {
        ArticlesStore.addObserver($scope, [
            {remoteProperty: ArticlesStore.UPDATING_ARTICLE, localProperty: 'selectedArticle'},
            {remoteProperty: ArticlesStore.CATEGORY_LIST, localProperty: 'categories'}
        ]);
        function init() {
            CKEDITOR.replace('brief_editor');
            CKEDITOR.replace('content_editor');
            $scope.input = {};
            $scope.input.title = $scope.selectedArticle.title;
            $scope.input.author = $scope.selectedArticle.author;
            CKEDITOR.instances.brief_editor.setData($scope.selectedArticle.contentBrief);
            CKEDITOR.instances.content_editor.setData($scope.selectedArticle.contentExtended);

            $scope.availableCategories = [];
            $scope.articleCategories = $scope.selectedArticle.categories;
            for (var i = 0; i < $scope.categories.length; i++) {
                var isDuplicate = false;
                for (var j = 0; j < $scope.selectedArticle.categories.length; j++) {
                    if ($scope.categories[i].id === $scope.selectedArticle.categories[j].id) {
                        isDuplicate = true;
                    }
                }
                if (!isDuplicate) {
                    $scope.availableCategories.push($scope.categories[i]);
                }
            }

            $scope.addCategory = function () {
                if ($scope.selectedCategory) {
                    var lengthArray = $scope.availableCategories.length;
                    for (var i = lengthArray - 1; i >= 0; i--) {
                        if ($scope.availableCategories[i].id === $scope.selectedCategory.id) {
                            $scope.availableCategories.splice(i, 1);
                        }
                    }
                    ArticleService.addCategory($scope.selectedArticle, $scope.selectedCategory,
                        function (article) {

                        },
                        function (err) {
                            alert('Fail to add category');
                        });
                }
            };
            $scope.submit = function () {
                $scope.selectedArticle.title = $scope.input.title;
                $scope.selectedArticle.author = $scope.input.author;
                $scope.selectedArticle.contentBrief = CKEDITOR.instances.brief_editor.getData();
                $scope.selectedArticle.contentExtended = CKEDITOR.instances.content_editor.getData();
                ArticleService.updateArticle($scope.selectedArticle,
                    function () {
                        $state.go('articles.main');
                    },
                    function () {
                    });
            };
        };
        if ($scope.selectedArticle) {
            init();
        } else {
            $state.go('articles.main');
        }
    }]);