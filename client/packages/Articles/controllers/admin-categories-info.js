/**
 * Created by hieuvo on 5/15/15.
 */
angular.module('Articles').controller('AdminCategoriesInfoController', ['$scope', 'CategoryService',
    function ($scope, CategoryService) {
        function init() {
            $scope.categoryGridOptions = {
                columnDefs: [
                    {field: 'name'},
                    {field: 'createdDate'}
                ]
            };
            CategoryService.findAllCategories(
                function (results) {
                //    $scope.categoryGridOptions.data = results;
                    $scope.categories = results;
                },
                function (err) {
                    alert('Fail to Get Categories');
                });
        };

        init();
    }
]);