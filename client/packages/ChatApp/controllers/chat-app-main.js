/**
 * Created by hieuvo on 5/13/15.
 */
angular.module('ChatApp')
    .controller('ChatAppController', ['$scope', "chatMessages", "chatUser", "userService", "$firebaseAuth", "ChatAppStore", "chatService",
        function ($scope, chatMessages, chatUser, userService, $firebaseAuth, ChatAppStore, chatService) {
            function init() {
                ChatAppStore.addObserver($scope, [
                    {remoteProperty: ChatAppStore.CURRENT_USER, localProperty: 'currentUser'}
                ]);
                var ref = new Firebase("https://shining-inferno-6830.firebaseio.com/users");
                $scope.authObj = $firebaseAuth(ref);
                $scope.login = {};
                $scope.request = {};
                $scope.conversation = [];
                $scope.sendingMessage = {};
            };

            $scope.user = "Guest " + Math.round(Math.random() * 100);

            // we add chatMessages array to the scope to be used in our ng-repeat
            $scope.messages = chatMessages;

            // a method to create new messages; called by ng-submit
            $scope.addMessage = function () {
                // calling $add on a synchronized array is like Array.push(),
                // except that it saves the changes to Firebase!
                $scope.messages.$add({
                    from: $scope.currentUser.email,
                    content: $scope.message
                });

                // reset the message input
                $scope.message = "";
            };
            $scope.createUser = function () {
                userService.createUser({email: $scope.newEmail, password: $scope.newPassword},
                    function (authData) {
                        $scope.currentUser = authData;
                    },
                    function (err) {

                    });
            };
            $scope.doLogin = function () {
                userService.login({email: $scope.login.email, password: $scope.login.password},
                    function (userData) {
                        $scope.conversations = $scope.currentUser.conversations;
                    },
                    function (err) {

                    });
            };
            $scope.doAddFriend = function () {
                if($scope.currentUser) {
                    chatService.sendFriendRequest($scope.currentUser, $scope.request.friendName,
                        function () {
                            alert('Request Successfully Sent');
                        },
                        function () {

                        });
                } else {
                    alert('You need to login first')
                }
            };
            $scope.sendMessage = function () {
                if($scope.currentUser) {
                    chatService.sendMessage($scope.currentUser, $scope.sendingMessage.recipientName, $scope.sendingMessage.content);
                }
            };
            $scope.$watch('currentUser.conversations', function (newVal, oldVal) {
                if($scope.currentUser) {
                    chatService.loadConversations($scope.currentUser.conversations);
                }
            })
            init();
        }]);