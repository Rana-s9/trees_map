class FavPlace < ApplicationRecord
  belongs_to :user
  has_one :tree

  validates :address, presence: true, uniqueness: true
  validates :fav_name, presence: true, uniqueness: true

  geocoded_by :address
  after_validation :geocode, if: :address_changed?
end
