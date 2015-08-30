class Post < ActiveRecord::Base
  has_many :comments
  extend FriendlyId
  friendly_id :title, use: :slugged

  # merge to always include comments in the post, not really important.
  def as_json(options = {})
    super(options.merge(include: :comments))
  end
end
