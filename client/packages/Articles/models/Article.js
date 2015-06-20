/**
 * Created by hieuvo on 5/4/15.
 */
angular.module('Articles').factory('Article', ['$resource', function ($resource) {

    var Article = $resource('/articles/:action/:property/:id', {
        id: '@id'
    }, {
        findAll: {
            method: 'GET',
            params: {action: 'findAll'},
            isArray: true
        },
        findByTitle: {
            method: 'GET',
            params: {action: 'findBy', property:'title'},
            isArray: true
        },
        findByAuthor: {
            method: 'GET',
            params: {action: 'findBy', property:'title'},
            isArray: true
        },
        create: {
            method: 'POST',
            params: {action: 'create'}
        },
        update: {
            method: 'PUT',
            params: {action: 'update', property: 'id', id: '@id'}
        },
        delete: {
            method: 'DELETE',
            params: {action: 'delete', property: 'id', id: '@id'}
        },
        categories: {
            url: '/articles/:id/categories',
            method: 'GET'
        },
        addCategory: {
            url: '/articles/:id/categories/add/:categoryId',
            method: 'GET'
        },
        removeCategory: {
            url: '/articles/:id/categories/remove/:categoryId',
            method: 'GET'
        }
    });
    Article.prototype.__className = 'Article';
    Article.prototype.__relationships = {
        categories: {type: 'TO_MANY', ref: 'ArticleCategory'}
    };
    PersistentModels.models.Article = Article;
    return Article;
}]);