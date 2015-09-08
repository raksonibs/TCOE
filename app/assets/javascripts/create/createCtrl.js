angular.module('photographerNews')
.controller('CreateCtrl', [
'$scope',
'$location',
'posts',
'Auth',
'$sce',
function($scope, $location, posts, Auth, $sce){
  // no longer need state params because config state gets that
  // get the post for comments though

  // $scope.posts = posts.posts;

  $scope.editView = true;
  $scope.showHome = true;
  $scope.showView = false;

  $scope.posts = posts.posts;

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
      title: $scope.title,
      teaser: $scope.teaser,
      body: $scope.postBody
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
}]);