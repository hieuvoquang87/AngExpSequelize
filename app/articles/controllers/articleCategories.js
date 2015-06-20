var Category = require('../models/ArticleCategory.js');
module.exports = {
    getAllCategories: getAllCategories,
    getCategoryById: getCategoryById,
    getCategoriesByNameLike: getCategoriesByNameLike,
    getChildCategories: getChildCategories,
    getParentCategories: getParentCategories,
    addChildCategories: addChildCategories,
    addParentCategories: addParentCategories,
    removeChildCategories: removeChildCategories,
    removeParentCategories: removeParentCategories,
    createCategory: createCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
};

function getAllCategories(req, res, next) {
    Category.findAll(
        function (err) {          
            next(err);
        }, 
        function (results) {
            res.json(results);
        });
};

function getCategoryById() {};

function getCategoriesByNameLike() {};

function getChildCategories() {};

function getParentCategories() {};

function addArticles() {};

function removeArticles() {};

function addChildCategories() {};

function removeChildCategories() {};

function addParentCategories() {};

function removeParentCategories() {};

function createCategory(req, res, next) {
    var newCategory = {
        name: req.body.name        
    };
    Category.create(newCategory,
        function (err) {
            console.log(err);
            next(err);
        },
        function (result) {
            res.json(result);
        });
};

function updateCategory() {};

function deleteCategory() {};