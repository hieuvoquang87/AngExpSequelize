/**
 * Created by hieuvo on 5/21/15.
 */
angular.module('ChatApp').factory("chatMessages", ["$firebaseArray",
    function($firebaseArray) {
        var ref = new Firebase("https://shining-inferno-6830.firebaseio.com/messages");

        return $firebaseArray(ref);
    }
]);