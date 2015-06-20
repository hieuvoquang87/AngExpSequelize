/**
 * Created by hieuvo on 5/17/15.
 */
var Sequelize = require('sequelize');
var models = require('./mysql.js');
var Article = models.Article;
var ArticleCategory = models.ArticleCategory;
//var ArticleCategoryArticle = models.ArticleCategoryArticle;

module.exports = {
    findAll: findAll,
    findById: findById,
    findByTitleLike: findByTitleLike,
    addCategory: addCategory,
    removeCategory: removeCategory,
    create: createArticle,
    update: updateArticle,
    delete: deleteArticle
};

function findAll(onError, onSuccess) {

}

function findById(articleId, onError, onSuccess) {
    Article.find({
        where: {id: articleId},
        include: [{model: ArticleCategory, as: 'categories'}]
    }).then(function (result) {
        onSuccess(result);
    }).catch(function (err){
        onError(err);
    });
}

function findByTitleLike(title, onFail, onSuccess) {
    Article.findAll({
        where: {
            title: {
                $like: '%' + title + '%'
            }
        },
        include: [{model: ArticleCategory, as: 'categories'}],
        order: [['updatedAt','DESC']]
    })
        .then(function (result) {
            onSuccess(result);
        })
        .catch(function (err) {
            onError(err);
        });
}

function addCategory(articleId, categoryId, onError, onSuccess) {
    Article.find({
        where: {id: articleId}
    }).then(function (article) {
        article.addCategories([categoryId])
            .then(function () {
                Article.find({
                    where: {id: articleId},
                    include: [{model: ArticleCategory, as: 'categories'}]
                }).then(function (result) {
                    onSuccess(result);
                })
            })
            .catch(function (err){
                onError(err);
            });
    }).catch(function (err){
        onError(err);
    });
}

function removeCategory(articleId, categories, onError, onSuccess) {
    Article.find({
        where: {id: articleId}
    }).then(function (article) {
        article.removeCategories([categoryId])
            .then(function () {
                Article.find({
                    where: {id: articleId},
                    include: [{model: ArticleCategory, as: 'categories'}]
                }).then(function (result) {
                    onSuccess(result);
                })
            })
            .catch(function (err){
                onError(err);
            });
    }).catch(function (err){
        onError(err);
    });
}

function createArticle(article, onError, onSuccess) {
    Article.build(article)
        .save()
        .then(function (result) {
            if (Array.isArray(article.categories)) {
                var categories = [];
                for (var i = 0; i < article.categories.length; i++) {
                    categories.push(article.categories[i].id);
                }
                result.setCategories(categories);
            }
            onSuccess(result);
        })
        .catch(function (err) {
            onError(err);
        });
}

function updateArticle(articleId, article, onError, onSuccess) {
    Article.update(article, {
        where: {id: articleId}
    })
        .then(function () {
            Article.find({
                where: {id: articleId},
                include: [{model: ArticleCategory, as: 'categories'}]
            })
                .then(function (updatedArticle) {
                    onSuccess(updatedArticle);
                })
                .catch(function (err) {
                    onError(err);
                });
        })
        .catch(function (err) {
            onError(err);
        });
}

function deleteArticle(articleId, onError, onSuccess) {

}