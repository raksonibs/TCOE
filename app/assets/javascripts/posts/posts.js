angular.module('tcoe')
.factory('posts', [
'$http',
function($http){
	var o = {
		posts: []
	};
	o.getAll = function() {
		return $http.get('/posts.json').success(function(data) {
			// angular copys the json data to the o posts client object. so this changes.
			angular.copy(data, o.posts);
		});
	};
	o.getFirst = function() {
		return $http.get('/posts/first.json').success(function(data) {
			// angular copys the json data to the o posts client object. so this changes.
			angular.copy(data, o.posts);
		});
	};
	o.create = function(post) {
		return $http.post('/posts.json', post).success(function(data){
			o.posts.push(data);
		});
	};

	o.upvote = function(post) {
		return $http.put('/posts/' + post.id + '/upvote.json').success(function(data) {
			post.upvotes += 1
		})
	}

	o.update = function(post) {
		return $http.put('/posts/' + post.id+'.json', {teaser: post.teaser, body: post.body, title: post.title, photo: post.photo, exercises: post.exercises}).success(function(data) {
			return data
		})
	}

	o.get = function(id) {
		return $http.get('/posts/' + id +'.json').then(function(res) {
			// angular.copy(res.data, o.posts);
			return res.data
		})
	}

	o.addExercise = function(id, exercise) {
		return $http.post('/posts/' + id + '/exercises.json', exercise)
	}

	o.updateExercise = function(id, exercise) {
		return $http.put('/posts/' + id.id + '/exercises/'+ id.exercise.id+'.json', id.exercise)
	}

	o.getExercises = function(id) {
		return $http.get('/posts/' + id + '/exercises.json')
	}

	o.addComment = function(id, comment) {
		return $http.post('/posts/' + id + '/comments.json', comment)
	}

	o.upvoteComment = function(post, comment) {
  return $http.put('/posts/' + post.id + '/comments/'+ comment.id + '/upvote.json')
    .success(function(data){
      comment.upvotes += 1;
    });
};
	return o;	
}]);