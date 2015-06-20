var express = require('express'),
    router = express.Router(),
    findRouter = express.Router(),
    articleController = require('./controllers/articles.js'),
    categoryController = require('./controllers/articleCategories.js'),
    authService = require('./services/authenticateService.js'),
    //Main Path for Router
    articlePath = '/articles',
    categoryPath = '/articles/categories';



router.route(articlePath + '/:action')
    .get(authService.isAuthenticated, function (req, res, next) {
        switch (req.params.action) {
        case 'findAll':
            articleController.getAllArticles(req, res, next);
            break;
        default:
            next();
        }
    })
    .post(authService.isAuthenticated, function (req, res, next) {
        switch (req.params.action) {
        case 'create':
            articleController.createArticle(req, res, next);
            break;
        default:
            next();
        }
    });

router.route(articlePath + '/findBy/:property')
    .get(authService.isAuthenticated, function (req, res, next) {
        switch (req.params.property) {
        case 'title':
            articleController.getArticlesByTitle(req, res, next);
            break;
        default:
            next();
        }
    });
router.route(articlePath + '/:action/id/:articleId')
    .get(authService.isAuthenticated, function (req, res, next) {
        switch (req.params.action) {
        case 'findBy':
            articleController.getArticleById(req, res, next);
            break;
        default:
            next();
        }
    })
    .put(authService.isAuthenticated, function (req, res, next) {
        switch (req.params.action) {
        case 'update':
            articleController.updateArticle(req, res, next);
            break;
        default:
            next();
        }
    })
    .delete(authService.isAuthenticated, function (req, res, next) {
        switch (req.params.action) {
        case 'delete':
            articleController.deleteArticle(req, res, next);
            break;
        default:
            next();
        }
    });

router.route(articlePath + '/:articleId/categories/:action/:categoryId')
    .get(authService.isAuthenticated, function (req, res, next) {
        switch (req.params.action) {
            case 'add':
                articleController.addCategory(req, res, next);
                break;
            case 'remove':
                articleController.removeCategory(req, res, next);
                break;
            default:
                next();
        }
    });
router.route(categoryPath + '/:action')
    .post(authService.isAuthenticated, function (req, res, next) {
        switch (req.params.action) {
        case 'create':
            categoryController.createCategory(req, res, next);
            break;
        default:
            next();
        }
    });

router.route(categoryPath + '/:action/:id')
    .put(authService.isAuthenticated, function (req, res, next) {
        switch (req.params.action) {
        case 'update':
            categoryController.updateCategory(req, res, next);
            break;
        default:
            next();
        }
    })
    .delete(authService.isAuthenticated, function (req, res, next) {
        switch (req.params.action) {
        case 'delete':
            categoryController.deleteCategory(req, res, next);
            break;
        default:
            next();
        }
    });
router.route(categoryPath + '/:action')
    .get(authService.isAuthenticated, function (req, res, next) {
        switch (req.params.action) {
        case 'findAll':
            categoryController.getAllCategories(req, res, next);
            break;
        default:
            next();
        }
    });
router.route(categoryPath + '/:action/:property/:key')
    .get(authService.isAuthenticated, function (req, res, next) {
        switch (req.params.action) {
        case '':
            articleController.getAllArticles(req, res, next);
            break;
        default:
            next();
        }
    });

module.exports = router;