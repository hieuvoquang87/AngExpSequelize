var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Article = require('./article.js');
categorySchema = new Schema({
    name: String,
    createdDate: String,
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
        }],
    childCategories: [{
        type: Schema.Types.ObjectId,
        ref: 'ArticleCategory'
        }],
    parentCategories: [{
        type: Schema.Types.ObjectId,
        ref: 'ArticleCategory'
        }]
});

categorySchema.methods.addArticles = function () {

};

categorySchema.methods.addToParentCategory = function () {

};

categorySchema.methods.addChildCategory = function () {

};

var ArticleCategory = mongoose.model('ArticleCategory', categorySchema);

module.exports = {
    findAll: findAll,
    findById: findById,
    findByArticleId: findByArticleId,
    findByNameLike: findByNameLike,
    create: createCategory
}

function findAll(onFail, onSuccess) {
    ArticleCategory.find({},
        function (err, results) {
            if (err) onFail(err);
            else onSuccess(results);
        });
}

function findById(categoryId, onFail, onSuccess) {
    try {
        if (categoryId) {
            ArticleCategory.findById(categoryId,
                function (err, result) {
                    if (err) onFail(err);
                    else onSuccess(result);
                });
        } else {
            throw new Error('Missing parameter: categoryId');
        }
    } catch (err) {
        onFail(err);
    }
}

function findByArticleId(articleId, onFail, onSuccess) {
    try {
        if (articleId) {
            console.log(articleId);
            ArticleCategory.find({
                   
                }).populate({
                path: 'articles',
                match: {_id: articleId},
                select: '_id name'
            })
                .exec(
                    function (err, results) {
                        if (err) onFail(err);
                        else {                         
                            var categories = [];
                            for(var i = 0; i< results.length; i++) {
                                if(results[i].articles.length > 0) {
                                    categories.push(results[i]);
                                }
                            }
                            onSuccess(categories);
                            console.log('-------find by articleId-------');
                            console.log(categories);
                            console.log('-------End find by articleId-------');
                        }
                    });
        } else {
            throw new Error('Missing Parameter: ArticleId');
        }
    } catch (err) {
        onFail(err);
    }
}

function findByNameLike(name, onFail, onSuccess) {
    try {
        if (name) {
            ArticleCategory.where('name')
                .regex(new RegExp(name))
                .exec(
                    function (err, results) {
                        if (err) onFail(err);
                        else onSuccess(results);
                    });
        } else {
            throw new Error('Missing Parameter: CategoryName');
        }
    } catch (err) {
        onFail(err);
    }

}

function createCategory(category, onFail, onSuccess) {
    try {
        category.createdDate = new Date();
        ArticleCategory.create(category,
            function (err, result) {
                if (err) onFail(err);
                else onSuccess(result);
            });
    } catch (err) {
        onFail(err);
    }
}

function updateCategory(categoryId, category, onFail, onSuccess) {}

function deleteCategory(categoryId, category, onFail, onSuccess) {}