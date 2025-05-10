class FavPlace < ApplicationRecord
  belongs_to :user
  has_one :tree, dependent: :destroy

  validates :address, presence: true, uniqueness: true
  validates :fav_name, presence: true, uniqueness: true
  validate :position_place

  geocoded_by :address
  after_validation :geocode, if: :address_changed?

  def position_place
    if fav_x.blank? || fav_y.blank? || fav_z.blank?
      errors.add(:base, '座標取得のため、もう一度お試しください')
    end
  end
end
