angular.module('photographerNews')
.controller('PostsCtrl', [
'$scope',
'post',
'$location',
'posts',
function($scope, post, $location, posts){
  // no longer need state params because config state gets that
  // get the post for comments though

  // $scope.posts = posts.posts;

  $scope.thisPost = post;

  $scope.postBody =  post.body;

  // $scope.showPageHero = $location.path() !== '/dashboard'

  $scope.postsAll = posts.getAll()

  $scope.updatePost = function(post) {
    // need to limit to post
    posts.update({
      title: $scope.title
    })
  }
}]);