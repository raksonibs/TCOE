class ExercisesController < ApplicationController
  def index
    @post = Post.find(params[:post_id])
    exercises = @post.exercises
    respond_with exercises
  end

  def update
    @exercise = Exercise.find(params[:exercise][:id])

    @exercise.update_attributes(exercise_params)

    respond_with @exercise
  end

  private
  def exercise_params
    params.require(:exercise).permit(:body, :post_id, :keyword, :id)
  end
end
