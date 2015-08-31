var myApp = angular.module('photographerNews', ['ui.router','templates', 'Devise', 'ng-admin']);


myApp.run(['Restangular', '$location', 'Auth', function(Restangular, $location, Auth){
    // ==== CODE TO DO 401 NOT LOGGED IN CHECKING
    //This code will intercept 401 unauthorized errors returned from web requests.
    //On default any 401 will make the app think it is not logged in.
    console.log(Auth.isAuthenticated())
    if (Auth.isAuthenticated()) {      
    } else {            
      $location.path('/home');
      return false;
    }
}]);

    myApp.run(['Restangular', '$location', function(Restangular, $location){
        // ==== CODE TO DO 401 NOT LOGGED IN CHECKING
        //This code will intercept 401 unauthorized errors returned from web requests.
        //On default any 401 will make the app think it is not logged in.

        Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {          
            if(response.status === 401){
              console.log('401')
                $location.path('/login');
                return false;
            }
        });
    }]);

myApp.config(['$stateProvider','$urlRouterProvider','NgAdminConfigurationProvider','RestangularProvider', function($stateProvider, $urlRouterProvider, nga, RestangularProvider) {

  $stateProvider
 .state('home', {
   url: '/home',
   templateUrl: 'home/_home.html',
   controller: 'MainCtrl',
   resolve: {
     postPromise: ['posts', function(posts){
       return posts.getFirst();
     }],
     allPostsPromise: ['posts', function(posts) {
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

     var admin = nga.application('TCOE.CO')
      .baseApiUrl('http://localhost:3000/'); // main API endpoint


    var post = nga.entity('posts');
post.listView()
            .title('All posts') // default title is "[Entity_name] list"
            .description('List of posts with infinite pagination') // description appears under the title
            .infinitePagination(true) // load pages as the user scrolls
            .fields([
                nga.field('id').label('id'), // The default displayed name is the camelCase field name. label() overrides id
                nga.field('title'), // the default list field type is "string", and displays as a string
                nga.field('published_at', 'date'),  // Date field type allows date formatting                                                
            ])
            .listActions(['show', 'edit', 'delete']);

        post.creationView()
            .fields([
                nga.field('title') // the default edit field type is "string", and displays as a text input
                    .attributes({ placeholder: 'the post title' }) // you can add custom attributes, too
                    .validation({ required: true, minlength: 3, maxlength: 100 }), // add validation rules for fields
                nga.field('teaser', 'text'), // text field type translates to a textarea
                nga.field('body', 'wysiwyg'), // overriding the type allows rich text editing for the body
                nga.field('published_at', 'date') // Date field type translates to a datepicker
            ]);


        post.editionView()
            .title('Edit post "{{ entry.values.title }}"') // title() accepts a template string, which has access to the entry
            .actions(['list', 'show', 'delete']) // choose which buttons appear in the top action bar. Show is disabled by default
            .fields([
                post.creationView().fields() // fields() without arguments returns the list of fields. That way you can reuse fields from another view to avoid repetition
                // customize look and feel through CSS classes
            ]);

    admin.menu(nga.menu()
        .addChild(nga.menu(post).icon('<span class="glyphicon glyphicon-pencil"></span>'))
        .addChild(nga.menu().icon('<span><a href="#/home/">Main Site</a></span>'))
    );

    admin.addEntity(post)

    nga.configure(admin);

 }]);