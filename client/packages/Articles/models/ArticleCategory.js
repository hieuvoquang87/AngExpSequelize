/**
 * Created by hieuvo on 5/10/15.
 */
angular.module('Articles').factory('ArticleCategory', ['$resource', function ($resource) {

    var ArticleCategory = $resource('/articles', {
        id: '@_id'
    }, {
        findAll: {
            url: '/articles/categories/findAll',
            method: 'GET',
            isArray: true
        },
        findById: {
            url: '/articles/categories/id/:id',
            method: 'GET',
            params: {id: '@_id'}
        },
        findByNameLike: {
            url: '/articles/categories/name/:name',
            method: 'GET',
            params: {name: 'name'},
            isArray: true
        },
        childCategories: {
            url: '/articles/categories/:id/childCategories',
            method: 'GET',
            params: {id: '@_id'}
        },
        parentCategories: {
            url: '/articles/categories/:id/parentCategories',
            method: 'GET',
            params: {id: '@_id'}
        },
        articles: {
            url: '/articles/categories/:id/articles',
            method: 'GET',
            params: {id: '@_id'}
        },
        create: {
            url: '/articles/categories/create',
            method: 'POST'
        },
        update: {
            url: '/articles/categories/update/:id',
            method: 'PUT',
            params: {id: '@_id'}
        },
        delete: {
            url: '/articles/categories/delete/:id',
            method: 'DELETE',
            params: {id: '@_id'}
        }
    });
    ArticleCategory.prototype.__className = 'ArticleCategory';
    ArticleCategory.prototype.__relationships = {
        articles: {type: 'TO_MANY', ref: 'Article'},
        childCategories: {type: 'TO_MANY', ref: 'ArticleCategory'},
        parentCategories: {type: 'TO_MANY', ref: 'ArticleCategory'}
    };
    PersistentModels.models.ArticleCategory = ArticleCategory;
    return ArticleCategory;
}]);