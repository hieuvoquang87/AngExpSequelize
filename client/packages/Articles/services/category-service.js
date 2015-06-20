/**
 * Created by hieuvo on 5/15/15.
 */
angular.module('Articles').service('CategoryService', ['ArticleCategory', function (ArticleCategory) {
    return {
        findAllCategories: function (successFcn, failFcn) {
            ArticleCategory.findAll({},
                function(results) {
                    successFcn(results);
                },
                function (err) {
                    failFcn(err);
                });
        },
        createCategory: function (categoryName, successFcn, failFcn) {
            ArticleCategory.create({
                    name: categoryName
                },
                function (result){
                    successFcn(result);
                },
                function (err){
                    failFcn(err);
                });
        }
    }
}]);