angular.module('photographerNews')
.controller('PostsCtrl', [
'$scope',
'post',
'$location',
'posts',
'Auth',
'$sce',
function($scope, post, $location, posts, Auth, $sce){
  // no longer need state params because config state gets that
  // get the post for comments though

  // $scope.posts = posts.posts;

  $scope.thisPost = post;

  $scope.postBody =  post.body;

  $scope.editView = false;
  $scope.showView = true;
  $scope.posts = posts.posts;

  $scope.firstId = post.id
  $scope.showHome = true;

  $scope.title = post.title;
  $scope.teaser = post.teaser;
  $scope.photo = post.photo;

  // $scope.showPageHero = $location.path() !== '/dashboard'

  $scope.postsAll = posts.getAll()

  $scope.updatePost = function(post) {
    // need to limit to post
    posts.update({
      title: $scope.title
    })
  }

  // $scope.postsAll = posts.getAll()

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

    post.title = $scope.title
    post.teaser = $scope.teaser
    post.body = $scope.postBody
    post.photo = $scope.photo
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
}]);