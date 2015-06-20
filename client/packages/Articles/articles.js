angular.module('Articles')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('/articles', '/articles/main');
            $urlRouterProvider.when('/articles/admin', '/articles/admin/articles');
            $urlRouterProvider.when('/articles/admin/articles', '/articles/admin/articles/info');
            $urlRouterProvider.when('/articles/admin/categories', '/articles/admin/categories/info');
            $stateProvider
                .state('articles', {
                    url: "/articles",
                    templateUrl: 'packages/Articles/views/articles.html',
                    controller: 'ArticlesController'
                })
                .state('articles.main', {
                    url: "/main",
                    templateUrl: 'packages/Articles/views/articles-main.html',
                    controller: 'ArticlesMainController',
                    resolve: {

                    }
                })
                .state('articles.admin', {
                    url: "/admin",
                    templateUrl: 'packages/Articles/views/articles-admin.html',
                    controller: 'ArticlesAdminController'
                })
                .state('articles.admin.articles', {
                    url: "/articles",
                    templateUrl: 'packages/Articles/views/admin-articles.html',
                    controller: 'ArticlesInfoController'
                })
                .state('articles.admin.articles.info', {
                    url: "/info",
                    templateUrl: 'packages/Articles/views/admin-articles-info.html',
                    controller: 'AdminArticlesInfoController'
                })
                .state('articles.admin.articles.create', {
                    url: "/create",
                    templateUrl: 'packages/Articles/views/create-modify-article.html',
                    controller: 'CreateArticleController'
                })
                .state('articles.admin.articles.update', {
                    url: "/update/:articleId",
                    templateUrl: 'packages/Articles/views/create-modify-article.html',
                    controller: 'UpdateArticleController'
                })
                .state('articles.admin.categories', {
                    url: "/categories",
                    templateUrl: 'packages/Articles/views/admin-categories.html'
                    //controller: 'Controller'
                })
                .state('articles.admin.categories.info', {
                    url: "/info",
                    templateUrl: 'packages/Articles/views/admin-categories-info.html',
                    controller: 'AdminCategoriesInfoController'
                })
                .state('articles.admin.categories.create', {
                    url: "/create",
                    templateUrl: 'packages/Articles/views/create-modify-category.html',
                    controller: 'CreateCategoryController'
                })
                ;
        }])
    .run(['ArticlesStore', 'ArticleService', 'CategoryService', function (ArticlesStore, ArticleService, CategoryService){
        var store = {};
        ArticlesStore.addObserver(store, [
            {remoteProperty: ArticlesStore.ARTICLE_LIST, localProperty: 'articles'},
            {remoteProperty: ArticlesStore.CATEGORY_LIST, localProperty: 'categories'}
        ]);
        CategoryService.findAllCategories(
            function (results) {
                console.log(ArticlesStore)
                store.categories = results;
            }, function (err) {

            });
    }]);