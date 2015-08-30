class PostsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote]

  def index
    @posts = Post.all


    # respond_to do |format| 
      respond_with @posts
    # end
  end

  def create
    respond_with Post.create(post_params)
  end

  def show
    # both show and edit go here. The save will have to go to an update action
    # also show when not logged in will have to be a different view
    respond_with Post.find(params[:id])
  end

  def upvote
    post = Post.find(params[:id])
    post.increment!(:upvotes)

    respond_with post
  end

  private
  def post_params
    params.require(:post).permit(:link, :title)
  end
end
