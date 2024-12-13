FactoryBot.define do
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
  end
end