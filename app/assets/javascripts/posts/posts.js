angular.module('writeBlog')
.factory('posts', [function(){
   var o = {
    posts: []
  };
  return o;
}])