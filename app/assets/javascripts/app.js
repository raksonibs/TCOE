angular.module('photographerNews', ['ui.router','templates'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'home/_home.html',
			controller: 'MainCtrl'
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
			controller: 'PostsCtrl'
		});

		$urlRouterProvider.otherwise('home');
}]);
