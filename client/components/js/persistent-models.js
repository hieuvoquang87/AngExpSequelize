/**
 * Created by hieuvo on 5/13/15.
 */
var PersistentModels = {};
(function (self){
    self.models = {};
    self.processResponse = function (response) {
        if(Array.isArray(response)) {

        } else if (Object.prototype.toString.call(response) === '[object Object]') {

        }
    };
}(PersistentModels));