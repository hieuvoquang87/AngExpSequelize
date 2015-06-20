/**
 * Created by hieuvo on 5/14/15.
 */
angular.module('Articles').service('ArticlesStore', ['ArticlesStoreDef', function (StoreDef) {
    var store = {};
    function getPropertyDescriptor(propertyName) {
        return {
            get: function () {
                return store[propertyName];
            },
            set: function (value) {
                store[propertyName] = value;
            }
        }
    };
    function registerObserver (object, remoteProperty, localProperty) {
        if(object.hasOwnProperty(localProperty)) {
            var temp = object[localProperty];
            Object.defineProperty(object, localProperty, getPropertyDescriptor(remoteProperty));
            object[localProperty] = temp;
        } else {
            Object.defineProperty(object, localProperty, getPropertyDescriptor(remoteProperty));
        }
    };
    function addObserver (object, propertyPairs) {
        if(Array.isArray(propertyPairs)) {
            for(var i = 0; i< propertyPairs.length; i++) {
                registerObserver(object, propertyPairs[i].remoteProperty, propertyPairs[i].localProperty);
            }
        }
    };
    StoreDef.addObserver = addObserver;
    StoreDef.store = store;
    return StoreDef;
}]).constant('ArticlesStoreDef', {
    UPDATING_ARTICLE: 'UPDATING_ARTICLE',
    ARTICLE_LIST: 'ARTICLE_LIST',
    CATEGORY_LIST: 'CATEGORY_LIST'
});