/**
 * Created by hieuvo on 5/17/15.
 */
var Sequelize = require('sequelize');
var db = new Sequelize('mysql://root:gaubu@localhost:3306/myapps', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});


var Article = db.define('Article', {
            title: {
                type: Sequelize.STRING,
                field: 'title'
            },
            author: {
                type: Sequelize.STRING,
                field: 'author'
            },
            contentBrief: {
                type: Sequelize.TEXT,
                field: 'contentBrief'
            },
            contentExtended: {
                type: Sequelize.TEXT,
                field: 'contentExtended'
            }
        }),
    ArticleCategory = db.define('ArticleCategory', {
            name: {
                type: Sequelize.STRING,
                field: 'name'
            }
        });

//ArticleCategory.hasMany(Article, {as: 'articles'});
Article.belongsToMany(ArticleCategory, {
    as: {singular: 'category', plural: 'categories'},
    through: 'ArticleCategoryArticle'
});
ArticleCategory.belongsToMany(Article, {
    as: {singular: 'article', plural: 'articles'},
    through: 'ArticleCategoryArticle'
});
ArticleCategory.belongsToMany(ArticleCategory, {as: 'childCategories', through: 'ChildCategories', foreignKey: 'categoryId'});


db.sync({});

module.exports = {
    Article: Article,
    ArticleCategory: ArticleCategory
};