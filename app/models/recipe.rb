class Recipe < ApplicationRecord
  validates :title, presence: true
  validates :instructions, presence: true, length: { maximum: 1500 }
  validates :ingredients_description, length: { maximum: 2000 }
  validates :servings, numericality: { less_than_or_equal_to: 999.9 }
  validates :ratings, numericality: { less_than_or_equal_to: 9.99 }
  validates :cook_time_seconds, numericality: { only_integer: true }
  validates :prep_time_seconds, numericality: { only_integer: true }

  has_many :ingredients

  def self.order_by_rating
    order(ratings: :desc)
  end

  def self.recommendations_with_any_ingredients(*ingredients)
    ingredients_keywords = ingredients.map { |val| "%#{val}%" }

    where("ingredients_description ILIKE ANY (ARRAY[?])", ingredients_keywords).order_by_rating
  end

  def self.recommendations_with_all_ingredients(*ingredients)
    ingredients_keywords = ingredients.map { |val| "%#{val}%" }

    where("ingredients_description ILIKE ALL (ARRAY[?])", ingredients_keywords).order_by_rating
  end
end
