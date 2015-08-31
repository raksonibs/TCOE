Rails.application.routes.draw do
  devise_for :users
	root to: 'application#angular'

  get 'posts/first' => 'posts#first',  defaults: { format: 'json' }
  get 'pages/:post_id' => 'posts#show_post',  defaults: { format: 'json' }

  resources :posts, only: [:create, :index, :show, :update],  defaults: { format: 'json' }
end
