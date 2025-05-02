class User < ApplicationRecord
  validates :user_name, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true

  has_many :fav_places, dependent: :destroy
  has_many :trees, dependent: :destroy

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def own?(object)
    id == object&.user_id
  end

  def places_no_trees
    fav_places.left_outer_joins(:tree).where(trees: { id:nil })
  end
end
