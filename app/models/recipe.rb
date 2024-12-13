class Recipe < ApplicationRecord
  validates :title, presence: true
  validates :instructions, presence: true
  validates :servings, numericality: { less_than_or_equal_to: 999.9 }
  validates :ratings, numericality: { less_than_or_equal_to: 9.99 }
  validates :instructions, length: { maximum: 1500 }
end
