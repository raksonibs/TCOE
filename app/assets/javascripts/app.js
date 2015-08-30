var myApp = angular.module('photographerNews', ['ui.router','templates', 'Devise', 'ng-admin']);

myApp.config(['$stateProvider','$urlRouterProvider','NgAdminConfigurationProvider', function($stateProvider, $urlRouterProvider, nga) {

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

        post.showView() // a showView displays one entry in full page - allows to display more data than in a a list
            .fields([
                nga.field('id'),
                post.editionView().fields(), // reuse fields from another view in another order
                nga.field('custom_action', 'template')
                    .label('')
                    .template('<send-email post="entry"></send-email>')
            ]);

    admin.menu(nga.menu()
        .addChild(nga.menu(post).icon('<span class="glyphicon glyphicon-pencil"></span>'))
        .addChild(nga.menu().icon('<span>Main Site</span>'))
    );

    admin.addEntity(post)

    nga.configure(admin);

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

   $urlRouterProvider.otherwise('home');

 }]);

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