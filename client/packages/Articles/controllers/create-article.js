angular.module('Articles').controller('CreateArticleController', ['$scope', '$state','ArticleService', 'ArticlesStore',
    function ($scope, $state, ArticleService, ArticlesStore) {
        CKEDITOR.replace('brief_editor');
        CKEDITOR.replace('content_editor');
        function init() {
            ArticlesStore.addObserver($scope, [
                {remoteProperty: ArticlesStore.CATEGORY_LIST, localProperty: 'categories'}
            ]);

            $scope.input = {};
            $scope.availableCategories = [];
            $scope.selectedCategories = [];

        };

        $scope.$watch('categories', function (newVal, oldVal) {
            if(Array.isArray(newVal) && newVal.length > 0) {
                for (var i = 0; i < newVal.length; i++) {
                    $scope.availableCategories.push(newVal[i]);
                }
            }
        });

        $scope.addCategory = function () {
            if ($scope.selectedCategory) {
                var lengthArray = $scope.availableCategories.length;
                for (var i = lengthArray - 1; i >= 0; i--) {
                    if ($scope.availableCategories[i]._id === $scope.selectedCategory._id) {
                        $scope.availableCategories.splice(i, 1);
                    }
                }
                $scope.selectedCategories.push($scope.selectedCategory);
            }
        };

        $scope.submit = function () {
            var contentBrief = CKEDITOR.instances.brief_editor.getData();
            var contentExtended = CKEDITOR.instances.content_editor.getData();
            ArticleService.createArticle($scope.input.title, $scope.input.author, contentBrief, contentExtended,
                function (results) {
                    $state.go('articles.main');
                }, function (err) {

                });
        };
        init();
    }]);