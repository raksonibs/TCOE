var myApp = angular.module('photographerNews', ['ui.router','templates', 'Devise', 'ng-admin'])

myApp.config(['RestangularProvider', function (RestangularProvider) {
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
        if (operation == "getList") {
            // custom pagination params
            if (params._page) {
                params._start = (params._page - 1) * params._perPage;
                params._end = params._page * params._perPage;
            }
            delete params._page;
            delete params._perPage;
            // custom sort params
            if (params._sortField) {
                params._sort = params._sortField;
                params._order = params._sortDir;
                delete params._sortField;
                delete params._sortDir;
            }
            // custom filters
            if (params._filters) {
                for (var filter in params._filters) {
                    params[filter] = params._filters[filter];
                }
                delete params._filters;
            }
        }
        return { params: params };
    });
}]);

myApp.config([
'$stateProvider',
'$urlRouterProvider',
'NgAdminConfigurationProvider',
function($stateProvider, $urlRouterProvider, nga) {
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
    // .state('register', {
    //   url: '/register',
    //   templateUrl: 'auth/_register.html',
    //   controller: 'AuthCtrl',
    //   controller: 'AuthCtrl',
    //   onEnter: ['$state', 'Auth', function($state, Auth) {
    //     Auth.currentUser().then(function (){
    //       $state.go('home');
    //     })
    //   }]
    // })
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

		$urlRouterProvider.otherwise('dashboard');

    var admin = nga.application('My First Admin')
      .baseApiUrl('http://localhost:3000/'); // main API endpoint
    // create a user entity
    // the API endpoint for this entity will be 'http://jsonplaceholder.typicode.com/users/:id
    var post = nga.entity('posts');
        post.listView().fields([
            nga.field('id'),
            nga.field('title'),
            nga.field('link'),
            nga.field('upvotes'),

        ]);
        admin.addEntity(post)
    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);
