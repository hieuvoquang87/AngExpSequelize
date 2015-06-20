var Article = require('../models/Article.js');
module.exports = {
    getAllArticles: function (req, res, next) {
        Article.findAll(function (err) {
                console.log(err);
                next(err);
            },
            function (results) {
                res.json(results);
            });
    },
    getArticleById: function (req, res, next) {
        var articleId = req.params.articleId,
            article = null;
        for (var i = 0; i < articles.length; i++) {
            if (articles[i].id == articleId) {
                article = articles[i];
            }
        }
        res.json(article);
    },
    getArticlesByAuthor: function (req, res, next) {

    },
    getArticlesByTitle: function (req, res, next) {
        Article.findByTitleLike(req.query.key,
            function (err) {
                next(err);
            },
            function (results) {
                res.json(results);
            });
    },
    addCategory: function (req, res, next) {
        var articleId = req.params.articleId;
        var categoryId = req.params.categoryId;
        console.log(articleId + '--------------------- cat id: '+ categoryId);
        Article.addCategory(articleId, categoryId,
            function (err) {
                next(err);
            },
            function (result) {
                res.json(result);
            });
    },
    createArticle: function (req, res, next) {
        var newArticle = {
            title: req.body.title,
            author: req.body.author,
            contentBrief: req.body.contentBrief,
            contentExtended: req.body.contentExtended
        };
        Article.create(newArticle,
            function (err) {
                console.log(err);
                next(err);
            },
            function (result) {
                res.json(result);
            });

    },
    updateArticle: function (req, res, next) {
        var articleId = req.params.articleId;        
        var article = req.body;
        var updatingArticle = {
            title: req.body.title,
            author: req.body.author,
            contentBrief: req.body.contentBrief,
            contentExtended: req.body.contentExtended,
        };
        Article.update(articleId, article,
            function (err) {
                console.log(err);
                next(err);
            },
            function (result) {   
               
                res.json(result)
            });
    }
}