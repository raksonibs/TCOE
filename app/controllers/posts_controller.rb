class PostsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote]

  def index
    @posts = Post.all
    params["format"] = "json"
    params = {"controller"=>"posts", "action"=>"index", "format"=>"json"}
    respond_with @posts
    end
  end

  def create
    respond_with Post.create(post_params)
  end

  def show
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
