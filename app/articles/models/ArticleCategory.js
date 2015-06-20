/**
 * Created by hieuvo on 5/17/15.
 */
var Sequelize = require('sequelize');
var ArticleCategory = require('./mysql.js').ArticleCategory;

module.exports = {
    findAll: findAll,
    findById: findById,
    findByArticleId: findByArticleId,
    findByNameLike: findByNameLike,
    create: createCategory
}

function findAll(onFail, onSuccess) {
    ArticleCategory.findAll()
        .then(function (results) {
            onSuccess(results);
        })
        .catch(function (err) {
            onFail(err);
        });
}

function findById(categoryId, onFail, onSuccess) {

}

function findByArticleId(articleId, onFail, onSuccess) {

}

function findByNameLike(name, onFail, onSuccess) {

}

function createCategory(category, onFail, onSuccess) {
    ArticleCategory.build(category)
        .save()
        .then(function (result) {
            onSuccess(result);
        })
        .catch(function (err) {
            onError(err);
        });
}

function updateCategory(categoryId, category, onFail, onSuccess) {
}

function deleteCategory(categoryId, category, onFail, onSuccess) {
}