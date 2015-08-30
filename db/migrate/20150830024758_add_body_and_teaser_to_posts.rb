class AddBodyAndTeaserToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :body, :text
    add_column :posts, :teaser, :text
    add_column :posts, :published_at, :date
    remove_column :posts, :upvotes, :integer
  end
end
