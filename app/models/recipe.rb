class Recipe < ApplicationRecord
  validates :title, presence: true
  validates :instructions, presence: true, length: { maximum: 1500 }
  validates :servings, numericality: { less_than_or_equal_to: 999.9 }
  validates :ratings, numericality: { less_than_or_equal_to: 9.99 }
  validates :cook_time_seconds, numericality: { only_integer: true }
  validates :prep_time_seconds, numericality: { only_integer: true }

  has_many :ingredients

  def self.any_recommendations(*ingredients)
    ingredients_keywords = ingredients.map { |val| "%#{val}%" }
    includes(:ingredients).
      where("ingredients.preparation_method ILIKE ANY (array[?])", ingredients_keywords).
        references("ingredients")
  end

  def self.in_recommendations(*ingredients)
    ingredients_keywords = ingredients.map { |val| "%#{val}%" }
    includes(:ingredients).
      where("ingredients.preparation_method ILIKE ALL (array[?])", ingredients_keywords).
        references("ingredients")
  end

  def ingredients_description
    ingredients.map(&:preparation_method).join("\n")
  end

  def as_json(options = {})
    super(options.merge(methods: :ingredients_description))
  end
end
