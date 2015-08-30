angular.module('photographerNews')
.controller('NavCtrl', [
'$scope',
'Auth',
'posts',
function($scope, Auth, posts){
  $scope.signedIn = Auth.isAuthenticated;
  $scope.logout = Auth.logout;

  $scope.postsAll = posts.posts

  Auth.currentUser().then(function (user){
    $scope.user = user;
  });

  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
  });
}]);