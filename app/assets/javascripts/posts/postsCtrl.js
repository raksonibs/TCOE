angular.module('photographerNews')
.controller('PostsCtrl', [
'$scope',
'posts',
'post',
function($scope, posts, $stateParams, post){
  $scope.post = posts.post
  // no longer need state params because config state gets that
  // get the post for comments though

  $scope.addComment = function(){
    if($scope.body === '') { return; }
    posts.addComment(post.id, {
      body: $scope.body,
      author: 'user',
    }).success(function(comment) {
      $scope.post.comments.push(comment);
    });
    $scope.body = '';
  };
  $scope.incrementUpvotes = function(post) {
    posts.upvoteComment(post, comment);
  };
}]);