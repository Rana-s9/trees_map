class CreateFavPlaces < ActiveRecord::Migration[8.0]
  def change
    create_table :fav_places do |t|
      t.references :user, null: false, foreign_key: true
      t.string :fav_name
      t.float :fav_x
      t.float :fav_y
      t.float :fav_z
      t.string :address
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
