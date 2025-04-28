# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_04_28_062356) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "fav_places", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "fav_name"
    t.float "fav_x"
    t.float "fav_y"
    t.float "fav_z"
    t.string "address"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_fav_places_on_user_id"
  end

  create_table "trees", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "fav_place_id"
    t.string "tree_name"
    t.float "position_x"
    t.float "position_y"
    t.float "position_z"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fav_place_id"], name: "index_trees_on_fav_place_id"
    t.index ["user_id"], name: "index_trees_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "user_name", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "fav_places", "users"
  add_foreign_key "trees", "fav_places"
  add_foreign_key "trees", "users"
end
