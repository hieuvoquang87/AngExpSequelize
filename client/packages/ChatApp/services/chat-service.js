/**
 * Created by hieuvo on 5/22/15.
 */
angular.module('ChatApp').service('chatService', ['$firebaseObject', '$firebaseArray', '$firebaseAuth', 'ChatAppStore',
    function ($firebaseObject, $firebaseArray, $firebaseAuth, ChatAppStore) {
        var user = {};
        ChatAppStore.addObserver(user, [
            {remoteProperty: ChatAppStore.CURRENT_USER, localProperty: 'currentUser'}
        ]);
        var conversationUrl = "https://shining-inferno-6830.firebaseio.com/conversations";
        var requestUrl = "https://shining-inferno-6830.firebaseio.com/requests";
        var userRef = new Firebase("https://shining-inferno-6830.firebaseio.com/users");
        var conversationRef = new Firebase(conversationUrl);
        var requestRef = new Firebase(requestUrl);

        function sendMessage (conversationId, sendingMessage) {
            var messages = $firebaseArray(new Firebase(conversationUrl+'/'+conversationId+'/messages'));
            messages.$add(sendingMessage).catch(function (err){
                console.log(err);
                alert('Fail To Send message');
            });
        }

        return {
            loadConversations: function (conversations) {
                for(var i in conversations) {
                    var conversationId = user.currentUser.conversations[i].conversationId;
                    if(!user.currentUser.conversations[i].messages) {
                        user.currentUser.conversations[i].sender = i;
                        user.currentUser.conversations[i].messages = $firebaseArray(new Firebase(conversationUrl+'/'+conversationId+'/messages'));
                    }
                }
            },
            sendFriendRequest: function (currentUser, recipientName, successFcn, failFcn) {
                if (currentUser) {
                    var conversationId = (currentUser.conversations)? currentUser.conversations[recipientName] : undefined;
                    var conversations = $firebaseArray(conversationRef);
                    if (conversationId) {
                        alert('Request already sent');
                        return conversationId;
                    } else {
                        conversations.$add({})
                            .then(function (ref) {
                                ref.child(currentUser.name).set(true);
                                ref.child(recipientName).set(false);
                                conversationId = ref.key();
                                if (userRef.child(currentUser.$id).child('conversations').child(recipientName).child(conversationId))
                                    userRef.child(currentUser.$id).child('conversations').child(recipientName).set({conversationId: conversationId});
                                var requests = $firebaseArray(new Firebase(requestRef + '/' + recipientName + "/requests"));
                                requests.$add({
                                    from: currentUser.name,
                                    requesterId: currentUser.$id,
                                    message: 'Please Add Me to List',
                                    conversationId: conversationId
                                })
                                    .then(function (ref) {
                                        successFcn(conversationId);
                                    })
                                    .catch(function (err) {
                                        failFcn(err);
                                    });
                            })
                            .catch(function (err) {

                            });
                    }
                }
            },
            respondToFriendRequest: function (request, isRequestAccepted, successFcn, failFcn) {
            },
            sendMessage: function (currentUser, recipientName, message) {
                var sendingMessage = {
                    from: currentUser.name,
                    content: message
                }
                if(!currentUser.conversations) {
                    currentUser.conversations = {};
                }
                var conversationId = (currentUser.conversations[recipientName])? currentUser.conversations[recipientName].conversationId : undefined;

                if(conversationId) {
                    sendMessage(conversationId, sendingMessage);
                } else {
                    conversationId = this.sendFriendRequest(currentUser, recipientName, function (conversationId){
                        sendMessage(conversationId, sendingMessage);
                        loadConversations(user.currentUser);
                    }, function (){});
                }
                
            }
        }
    }]);