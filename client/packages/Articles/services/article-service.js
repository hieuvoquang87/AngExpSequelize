/**
 * Created by hieuvo on 5/7/15.
 */
angular.module('Articles').service('ArticleService', ['Article', function (Article) {
    return {
        createArticle: function (title, author, contentBrief, content, successFcn, failFcn) {
            Article.create({
                title: title,
                author: author,
                contentBrief: contentBrief,
                contentExtended: content
            }, function (result) {
                successFcn(result);
            }, function (err) {
                failFcn(err);
            });
        },
        updateArticle: function (updatingArticle, successFcn, failFcn) {
            updatingArticle.$update({},
                function (result) {
                    successFcn(result);
                },
                function (err) {
                    failFcn(err);
                });
        },
        findArticlesByTitle: function (title, successFcn, failFcn) {
            var article = Article.findByTitle({key: title},
                function (results) {
                    successFcn(results);
                }, function (err) {
                    failFcn(err);
                });
        },
        addCategory: function (article, category, successFcn, failFcn) {
            article.$addCategory({categoryId: category.id},
                function (result){
                    successFcn(result);
                },
                function (err){
                    failFcn(err);
                });
        },
        removeCategory: function (article, category, successFcn, failFcn) {

        }
    }
}]);
