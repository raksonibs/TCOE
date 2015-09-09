class ExercisesController < ApplicationController
  def index
    @post = Post.find(params[:post_id])
    exercises = @post.exercises
    respond_with exercises
  end

  def update
    binding.pry
  end
end
