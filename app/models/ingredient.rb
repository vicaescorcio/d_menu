class Ingredient < ApplicationRecord
  validates :name, presence: true
  validates :preparation_method, length: { maximum: 255 }

  belongs_to :recipe
end
