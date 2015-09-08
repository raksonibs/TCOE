class AddKeywordToExercises < ActiveRecord::Migration
  def change
    add_column :exercises, :keyword, :text
  end
end
