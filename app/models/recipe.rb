class Recipe < ApplicationRecord
  validates :title, presence: true
  validates :instructions, presence: true, length: { maximum: 1500 }
  validates :servings, numericality: { less_than_or_equal_to: 999.9 }
  validates :ratings, numericality: { less_than_or_equal_to: 9.99 }
  validates :cook_time_seconds, numericality: { only_integer: true }
  validates :prep_time_seconds, numericality: { only_integer: true }

  has_many :preparations, dependent: :destroy
  has_many :ingredients, through: :preparations
end
