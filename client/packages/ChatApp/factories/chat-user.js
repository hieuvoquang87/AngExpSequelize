/**
 * Created by hieuvo on 5/22/15.
 */
angular.module('ChatApp').factory("chatUser", ["$firebaseObject",
    function($firebaseObject) {
        var ref = new Firebase("https://shining-inferno-6830.firebaseio.com/users");

        return function (userId) {
            return new $firebaseObject(ref.child(userId));
        }
    }
]);