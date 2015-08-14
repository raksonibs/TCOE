angular.module('photographerNews')
.controller('PostsCtrl', [
'$scope',
'posts',
'$stateParams',
function($scope, posts, $stateParams){
  $scope.post = posts.posts[$stateParams.id];

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