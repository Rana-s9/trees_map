class Tree < ApplicationRecord
  belongs_to :user
  belongs_to :fav_place, dependent: :destroy, optional: true # fav_placeなしでも植えられる場合は optional: true を追加

  validates :tree_name, presence: true
end