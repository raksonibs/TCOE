
angular.module('tcoe')
.controller('dashboardCtrl', [
'$scope',
'$location',
function($scope, posts, $location){

  $scope.showPageHero = $location.path() !== '/dashboard'


}]);
