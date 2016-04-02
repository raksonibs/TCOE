angular.module('photographerNews')
.controller('MainCtrl', [
'$scope',
'posts',
'$location',
'$sce',
'Auth',
'$timeout',
function($scope, posts, $location, $sce, Auth, $timeout){

  // $scope.postsAll = posts.getAll()
  $scope.editView = false;
  $scope.showView = true;
  $scope.showHome = false
  $scope.fadeOut = true
  $scope.posts = posts.posts;
  $scope.showLoadBar = true;

  $scope.firstVisitNotLink = true

  $scope.thisPost = posts.posts[0];

  $scope.firstId = $scope.thisPost.id

  $scope.postBody = posts.posts[0].body;

  $scope.allpostsBodies = posts.posts.map(function(post) { return post.body } )

  $scope.allposts = posts.posts.filter(function(post,index) { if (index != 0) return post })

  post = posts.posts[0]

  exercises = posts.posts.map(function(post) { return post.exercises })

  $scope.exercises =  exercises

  $scope.title = posts.posts[0].title;
  $scope.teaser = posts.posts[0].teaser;
  $scope.photo = posts.posts[0].photo;
  // $scope.exercises = posts.posts[0].exercises;

  Auth.currentUser().then(function (user){
    $scope.user = user;
  });

  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
  });

  $scope.signedIn = Auth.isAuthenticated;

  $scope.toTrustedHTML = function( html ) {
    return $sce.trustAsHtml( html );
  }

  $scope.addPost = function(){
    if(!$scope.title || $scope.title === ''){ return; }
    posts.create({
      title: $scope.title
    });
    $scope.title = '';
  };

  $scope.updatePost = function(post) {
    // need to limit to post
    posts.update({
      id: post.id,
      title: $scope.title,
      teaser: $scope.teaser,
      body: $scope.postBody,
      photo: $scope.photo
    })

    $timeout(loadBar, 2000)

    $scope.showLoadBar = false;

    post.title = $scope.title
    post.teaser = $scope.teaser
    post.body = $scope.postBody
    post.photo = $scope.photo
    // post.exercises = $scope.exercises
  }

  $scope.updateExercise = function(post, exercise) {
    // need to limit to exercise
    posts.updateExercise({
      id: post.id,
      exercise: {
        id: exercise.id,
        body: exercise.body,
        keyword: exercise.keyword
      }
    })
  }

  $scope.incrementUpvotes = function(post){
    post.upvote(post);
  };

  $scope.changeToEdit = function() {
    $scope.editView = true
    $scope.showView = false
  }

  $scope.changeToShow = function() {
    $scope.editView = false
    $scope.showView = true
  }

  // $timeout(loadScreen, 2000)

  function loadBar() {
    $scope.showLoadBar = true
  }
}]);

function setTabHeight() {
  
}


function loadScreen() {
  $scope.fadeOut = true
  $scope.showHome = true;
  console.log('load screen')
}

function mapKeywords() {
  // can't check each word in the body, that would take forever
  // to see if that keyword is the word. How to do this.
  // not only that, need to mark it somehow
  // I KNOW! instead of trying to map, that will be good, a quick solution
  // is to find the word that is underlined, and find the respective exercise.
  // yeah!
}