class CreateTrees < ActiveRecord::Migration[8.0]
  def change
    create_table :trees do |t|
      t.references :user, null: false, foreign_key: true
      t.references :fav_place, foreign_key: true
      t.string :tree_name
      t.float :position_x
      t.float :position_y
      t.float :position_z

      t.timestamps
    end
  end
end
