angular.module('photographerNews')
.controller('MainCtrl', [
'$scope',
'posts',
'$location',
'$sce',
function($scope, posts, $location, $sce){

  // $scope.postsAll = posts.getAll()

  $scope.posts = posts.posts;

  $scope.thisPost = posts.posts[0];

  $scope.firstId = $scope.thisPost.id

  $scope.postBody =  posts.posts[0].body;

  $scope.title = posts.posts[0].title;

  $scope.message = "Default message"

  // $scope.postsAll = posts.posts

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
      body: $scope.body
    })

    post.title = $scope.title
    post.teaser = $scope.teaser
  }

  $scope.incrementUpvotes = function(post){
    post.upvote(post);
  };

}]);