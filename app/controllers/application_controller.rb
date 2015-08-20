class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_filter :authenticate_user!

  respond_to :json
  
  def angular
  	render 'layouts/application'
  end

  private
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :username
  end
end
