var myApp = angular.module('photographerNews', ['ui.router','templates', 'Devise', 'textAngular']);


myApp.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

$stateProvider
 .state('home', {
   url: '/home',
   templateUrl: 'home/_home.html',
   controller: 'MainCtrl',
   resolve: {
     postPromise: ['posts', function(posts) {
      return posts.getAll();
     }]
   }
 })
 .state('login', {
    url: '/login',
    templateUrl: 'auth/_login.html',
    controller: 'AuthCtrl',
    onEnter: ['$state', 'Auth', function($state, Auth) {
      Auth.currentUser().then(function (){
        $state.go('home');
      })
    }]
  })
  .state('posts', {
     url: '/posts/{id}',
     templateUrl: 'posts/_posts.html',
     controller: 'PostsCtrl',
     resolve: {
       post: ['$stateParams', 'posts', function($stateParams, posts) {
         return posts.get($stateParams.id)
       }]
     }
  });

 $urlRouterProvider.otherwise('home');

}]);