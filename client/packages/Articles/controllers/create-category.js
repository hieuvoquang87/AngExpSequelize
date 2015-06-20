/**
 * Created by hieuvo on 5/15/15.
 */
angular.module('Articles').controller('CreateCategoryController', ['$scope', 'CategoryService', 'ArticlesStore',
    function ($scope, CategoryService, ArticlesStore) {
        function init() {
            ArticlesStore.addObserver($scope, [
                {remoteProperty: ArticlesStore.CATEGORY_LIST, localProperty: 'categories'}
            ]);

            $scope.input = {};
            $scope.input.childCategories = [];
            $scope.input.parentCategories = [];


            $scope.selectedChildcategories = [];
            $scope.selectedChildcategories = [];
        };

        $scope.addChildCategory = function () {
            $scope.selectedChildcategories.push($scope.selectedChildCategory);
        };
        $scope.submit = function () {
            CategoryService.createCategory($scope.input.name,
                function (result) {

                },
                function (err) {

                });
        };
        init();
    }]);