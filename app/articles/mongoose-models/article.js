var mongoose = require('mongoose'),
    relationship = require('mongoose-relationship'),
    Schema = mongoose.Schema,
    ArticleCategory = require('./articleCategory.js'),
    articleSchema = new Schema({
        title: String,
        author: String,
        createdDate: String,
        lastUpdatedDate: String,
        contentBrief: String,
        contentExtended: String,
        categories: [{
            type: Schema.Types.ObjectId,
            ref: 'ArticleCategory',
            childPath: 'articles'
        }]
    });
articleSchema.plugin(relationship, {
    relationshipPathName: 'categories'
});

articleSchema.methods.getTitleAuthor = function () {
    return this.title + "---" + this.author;
};

articleSchema.methods.addToCategories = function (categoryId) {
    try {
        var article = this;
        ArticleCategory.findById(categoryId,
            function (err) {
                throw err;
            },
            function (category) {
                if (Array.isArray(category.articles)) {
                    category.articles.push(article);
                    category.save();
                }
            });
        ArticleCategory.findByArticleId(article._id,
            function (err) {
                console.log(err);
            },
            function (results) {
                
            });
    } catch (err) {}
};

var Article = mongoose.model('Article', articleSchema);

module.exports = {
    findAll: findAll,
    findById: findById,
    findByTitleLike: findByTitleLike,
    create: createArticle,
    update: updateArticle,
    delete: deleteArticle
};

function findAll(onError, onSuccess) {
    Article.find().exec(function (err, results) {
        try {
            if (err) onError(err);
            else onSuccess(results);
        } catch (err) {
            onError(err);
        }
    });
}

function findById(articleId, onError, onSuccess) {
    try {
        if (articleId) {
            Article.findById(articleId,
                function (err, result) {
                    if (err) onError(err);
                    else onSuccess(result);
                });
        } else {
            throw new Error('Missing parameter: articleId');
        }
    } catch (err) {
        onError(err);
    }
}

function findByTitleLike(title, onFail, onSuccess) {
    try {
        Article.where('title')
            .regex(new RegExp(title, "i"))
            .exec(
                function (err, results) {
                    if (err) onFail(err);
                    else onSuccess(results);
                });
    } catch (err) {
        onFail(err);
    }
}

function createArticle(article, onError, onSuccess) {
    Article.create({
        title: article.title,
        author: article.author,
        createdDate: new Date(),
        lastUpdatedDate: new Date(),
        contentBrief: article.contentBrief,
        contentExtended: article.contentExtended
    }, function (err, result) {
        if (err) onError(err);
        else onSuccess(result);
    });
}

function updateArticle(articleId, article, onError, onSuccess) {
    try {
        if (articleId) {
            article.lastUpdatedDate = new Date();
            Article.findByIdAndUpdate(articleId, article,
                function (err, result) {
                    if (err) onError(err);
                    else {
                        Article.findById(articleId).populate('categories').exec(
                            function (err, result) {
                                if (err) onError(err);
                                else {
                                    for (var i = 0; i < result.categories.length; i++) {
                                        result.addToCategories(result.categories[i]._id);
                                    }
                                    onSuccess(result);
                                }
                            })
                    }
                });
        } else {
            throw new Error('Missing parameter: articleId');
        }
    } catch (err) {
        onError(err);
    }
}

function deleteArticle(articleId, onError, onSuccess) {
    try {
        if (articleId) {
            Article.findByIdAndRemove(articleId,
                function (err, result) {
                    if (err) onError(err);
                    else onSuccess(result);
                });
        } else {
            throw new Error('Missing parameter: articleId');
        }
    } catch (err) {
        onError(err);
    }
}