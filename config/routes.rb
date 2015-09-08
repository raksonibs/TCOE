Rails.application.routes.draw do
  devise_for :users, defaults: {format: 'json'}
	root to: 'application#angular'

  get 'posts/first' => 'posts#first',  defaults: { format: 'json' }
  get 'pages/:post_id' => 'posts#show_post',  defaults: { format: 'json' }

  resources :posts, defaults: { format: 'json' } do 
    resources :exercises, defaults: { format: 'json' }
  end

  # get '/logout_route' => 'posts#logout_route'
end
