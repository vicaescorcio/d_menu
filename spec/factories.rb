FactoryBot.define do
  factory :ingredient do
    name { Faker::Food.ingredient }
    recipe { FactoryBot.create(:recipe) }
    quantity_grams { Faker::Number.number(digits: 4) }
    quantity_ml { Faker::Number.number(digits: 4) }
    preparation_method { Faker::Food.description }
  end

  factory(:recipe) do
    title { Faker::Food.dish }
    instructions { Faker::Lorem.paragraph }
    servings { Faker::Number.decimal(l_digits: 1, r_digits: 2) }
    ratings { Faker::Number.decimal(l_digits: 1, r_digits: 2) }
    author { Faker::Name.name }
    prep_time_seconds { Faker::Number.number(digits: 4) }
    cook_time_seconds { Faker::Number.number(digits: 4) }
    category { Faker::Food.ingredient }
    image_url { Faker::Internet.url }
    ingredients_description { Faker::Lorem.paragraph }
  end
end
