class Preparation < ApplicationRecord
  validates :quantity_amount, numericality: { less_than_or_equal_to: 99_999.99, greater_than: 0 }
  validates :quantity_grams, numericality: { only_integer: true, greater_than: 0 }
  validates :quantity_ml, numericality: { only_integer: true, greater_than: 0 }
  validates :preparation_method, length: { maximum: 255 }

  belongs_to :recipe
  belongs_to :ingredient
end
