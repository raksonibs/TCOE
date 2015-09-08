class CreateExercises < ActiveRecord::Migration
  def change
    create_table :exercises do |t|
      t.text :body
      t.integer :post_id
      t.timestamps null: false
    end
  end
end
