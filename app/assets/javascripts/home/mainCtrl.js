angular.module('photographerNews')
.controller('MainCtrl', [
'$scope',
'posts',
'$location',
'$sce',
function($scope, posts, $location, $sce){

  $scope.posts = posts.posts;

  $scope.thisPost = posts.posts[0];

  $scope.postBody =  posts.posts[0].body;

  $scope.showPageHero = $location.path() !== '/dashboard'

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

  $scope.incrementUpvotes = function(post){
    post.upvote(post);
  };

}]);