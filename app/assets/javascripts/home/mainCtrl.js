angular.module('photographerNews')
.controller('MainCtrl', [
'$scope',
'posts',
'$location',
function($scope, posts, $location){

  $scope.posts = posts.posts;

  $scope.showPageHero = $location.path() === '/dashboard'

  console.log($scope)

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