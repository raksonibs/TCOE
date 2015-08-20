angular.module('photographerNews', ['ui.router','templates', 'Devise'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
	// the resolve ensures anytime home state is entering, we query all posts.
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'home/_home.html',
			controller: 'MainCtrl',
			resolve: {
			  postPromise: ['posts', function(posts){
			    return posts.getAll();
			  }]
			}
		})
		.state('login', {
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthCtrl',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    })
    .state('register', {
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthCtrl',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    })
		.state('elements', {
			url: '/elements',
			templateUrl: 'elements/_elements.html',
			controller: 'elementsCtrl'
		})
		.state('personal', {
			url: '/personal',
			templateUrl: 'personal/_personal.html',
			controller: 'personalCtrl'
		})
		.state('about', {
			url: '/about',
			templateUrl: 'about/_about.html',
			controller: 'aboutCtrl'
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
		// angular ui detects entering posts state and then will automatically query the server for full post object including comments (because how back up is set). only after reuqest is has reutrned will state finish loading. 
		// on enter users Auth.currentUser() to detect if user exists

		$urlRouterProvider.otherwise('home');
}]);
