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
  $scope.fadeOut = false
  $scope.posts = posts.posts;

  $scope.thisPost = posts.posts[0];

  $scope.firstId = $scope.thisPost.id

  $scope.postBody =  posts.posts[0].body;

  $scope.title = posts.posts[0].title;
  $scope.teaser = posts.posts[0].teaser;

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
      title: $scope.title,
      link: $scope.link,
    });
    $scope.title = '';
    $scope.link = '';
  };

  $scope.updatePost = function(post) {
    // need to limit to post
    posts.update({
      id: post.id,
      title: $scope.title,
      teaser: $scope.teaser,
      body: $scope.postBody
    })

    post.title = $scope.title
    post.teaser = $scope.teaser
    post.body = $scope.postBody
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

  $timeout(loadScreen, 3000)

}]);

function loadScreen() {
  $scope.fadeOut = true
  $scope.showHome = true;
  console.log('load screen')
}