Rails.application.routes.draw do
  devise_for :users
	root to: 'application#angular'

  get 'posts/first' => 'posts#first',  defaults: { format: 'json' }

  resources :posts, only: [:create, :index, :show, :update],  defaults: { format: 'json' } do
    resources :comments, only: [:show, :create] do
      # puts to id rather than post_id
      member do
        put '/upvote' => 'comments#upvote'
      end
    end

    member do
      put '/upvote' => 'posts#upvote'
    end
  end
end
