class Tree < ApplicationRecord
  belongs_to :user
  belongs_to :fav_place, optional: true # fav_placeなしでも植えられる場合は optional: true を追加

  validates :tree_name, presence: true
  validate :position_tree

  def position_tree
    if position_x.blank? || position_y.blank? || position_z.blank?
      errors.add(:base, "座標情報が不足しています。恐れ入りますが、場所登録からもう一度お試しください")
    end
  end
end
