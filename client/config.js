/**
 * Created by hieuvo on 5/14/15.
 */
angular.module('myApp', [
    'ngRoute',
    'ui.router',
    'ui.grid',
    'ngSanitize',
    'myApp.directives',
    'myApp.views',
    'Articles',
    'ChatApp',
    'firebase'
]);
angular.module('myApp.directives', []);
angular.module('myApp.views', ['ui.router']);
angular.module('Articles', ['ngResource', 'ui.router']);
angular.module('ChatApp', []);