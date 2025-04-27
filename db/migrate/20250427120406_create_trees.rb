class CreateTrees < ActiveRecord::Migration[8.0]
  def change
    create_table :trees do |t|
      t.references :user, null: false, foreign_key: true
      t.references :fav_place, null: false, foreign_key: true
      t.string :tree_name
      t.float :random_x
      t.float :random_y
      t.float :random_z

      t.timestamps
    end
  end
end
