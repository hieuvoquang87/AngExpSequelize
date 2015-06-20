/**
 * Created by hieuvo on 5/22/15.
 */
angular.module('ChatApp').service('userService', ['$firebaseObject', '$firebaseArray', '$firebaseAuth', 'ChatAppStore',
    function ($firebaseObject, $firebaseArray, $firebaseAuth, ChatAppStore) {
        var user = {};
        ChatAppStore.addObserver(user, [
            {remoteProperty: ChatAppStore.CURRENT_USER, localProperty: 'currentUser'}
        ]);
        var userUrl = "https://shining-inferno-6830.firebaseio.com/users";
        var requestUrl = "https://shining-inferno-6830.firebaseio.com/requests";
        var conversationUrl = "https://shining-inferno-6830.firebaseio.com/conversations";
        var ref = new Firebase("https://shining-inferno-6830.firebaseio.com/users");
        var requestRef = new Firebase("https://shining-inferno-6830.firebaseio.com/requests");
        var userRequests = $firebaseArray(requestRef);
        var users = $firebaseArray(ref);
        var authObj = $firebaseAuth(ref);

        function getName(authData) {
            switch (authData.provider) {
                case 'password':
                    return authData.password.email.replace(/@.*/, '');
                case 'twitter':
                    return authData.twitter.displayName;
                case 'facebook':
                    return authData.facebook.displayName;
            }
        }

        function checkNewRequest(currentUserName, userData) {
            var userRequestRef = new Firebase(requestUrl + "/" + currentUserName + "/requests");
            $firebaseArray(userRequestRef).$loaded().then(function(requests) {
                for(var i = 0; i< requests.length;i++) {
                    var conversationId = requests[i].conversationId;
                    userData.child('conversations').child(requests[i].from).set({conversationId: conversationId});
                }
            })
        }

        return {
            createUser: function (args, successFcn, failFcn) {
                var email = args.email,
                    password = args.password;
                authObj.$createUser({
                    email: email,
                    password: password
                }).then(function () {
                    return authObj.$authWithPassword({
                        email: email,
                        password: password
                    });
                }).then(function (authData) {
                    ref.child(authData.uid).set({
                        provider: authData.provider,
                        name: getName(authData)
                    }, function (err){
                        if(err) {
                            failFcn(err);
                        } else {
                            requestRef.child(getName(authData))
                                .set({email: email, userId: authData.uid}, function (err) {
                                    if(err) {
                                        failFcn(err);
                                    } else {
                                        var userData = ref.child(authData.uid);
                                        user.currentUser = new $firebaseObject(userData);
                                        successFcn(user.currentUser);
                                    }
                                });
                        }
                    });
                }).catch(function (error) {
                    console.error("Error: ", error);
                    failFcn(error);
                });
            },
            login: function (args, successFcn, failFcn) {
                authObj.$authWithPassword({
                    email: args.email,
                    password: args.password
                }).then(function (authData) {
                    var userData = ref.child(authData.uid);
                    $firebaseObject(userData).$loaded().then(function (ref) {
                        user.currentUser = ref;
                        successFcn(user.currentUser);
                    });
                    //Check for new requests
                    var userRequestRef = new Firebase(requestUrl + "/" + getName(authData) + "/requests");
                    userRequestRef.on('child_added', function (snapshot) {
                        checkNewRequest(getName(authData), userData);
                        var requests = $firebaseArray(userRequestRef).$loaded().then(function (ref) {
                            var length = requests.length;
                            for(var i = length -1 ; i >= 0 ; i--) {
                                userRequestRef.$remove(userRequestRef[0]);
                            }
                        });
                    });

                }).catch(function (error) {

                });
            }
        }
    }]);