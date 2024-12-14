class Ingredient < ApplicationRecord
  validates :name, presence: true
  validates :quantity_grams, numericality: { only_integer: true, greater_than: 0 }
  validates :quantity_ml, numericality: { only_integer: true, greater_than: 0 }
  validates :preparation_method, length: { maximum: 255 }

  belongs_to :recipe
end
