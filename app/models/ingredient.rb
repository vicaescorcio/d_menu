class Ingredient < ApplicationRecord
  validates :name, presence: true

  has_many :preparations
  has_many :recipes, through: :preparations
end
