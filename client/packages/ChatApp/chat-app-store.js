/**
 * Created by hieuvo on 5/22/15.
 */
angular.module('ChatApp').service('ChatAppStore', ['ChatAppStoreDef', function (StoreDef) {
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
}]).constant('ChatAppStoreDef', {
    CURRENT_USER: 'CURRENT_USER'
});