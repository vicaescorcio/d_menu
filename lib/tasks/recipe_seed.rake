DOWNLOADED_FILE_PATH = "downloaded_recipes.json.gz"
DOWNNLOAD_URL = "https://pennylane-interviewing-assets-20220328.s3.eu-west-1.amazonaws.com/recipes-en.json.gz"

namespace :db do
  namespace :seed do
    desc "Seed the database with recipes"

    task :download_recipes do
      require "open-uri"
      require "json"

      begin
        URI.open(DOWNNLOAD_URL) do |remote_file|
          File.open(DOWNLOADED_FILE_PATH, "wb") do |local_file|
            local_file.write(remote_file.read)
          end
        end
      rescue OpenURI::HTTPError => e
        puts "Error downloading recipes: #{e.message}"
      end
    end

    task recipes: [:download_recipes, :environment] do
      decompressed_data = Zlib::GzipReader.open(DOWNLOADED_FILE_PATH) do |gz|
        gz.read
      end

      json_data = JSON.parse(decompressed_data)

      puts "Seeding database with #{json_data.count} recipes"

      ActiveRecord::Base.transaction do
        json_data.each_with_index do |recipe_data, index|
          puts "Seeding recipe (#{index+1}/#{json_data.count}): #{recipe_data['title']}..."
          recipe = Recipe.find_or_create_by(title: recipe_data["title"]) do |r|
            r.cook_time_seconds = (recipe_data["cook_time"]|| 1)  * 60
            r.prep_time_seconds = (recipe_data["prep_time"] || 1) * 60
            r.instructions = "No instructions provided"
            r.servings = 1
            r.ratings ||= recipe_data["ratings"]
            r.category = recipe_data["category"]
            r.author = recipe_data["author"]
            r.image_url = recipe_data["image"]
          end

          recipe.save!

          recipe_data["ingredients"].each do |ingredient_data|
            ingredient = Ingredient.find_or_create_by(preparation_method: ingredient_data) do |i|
              i.name = ingredient_data
            end
            ingredient.recipe = recipe
            ingredient.save!
          end
        end
      end

      rescue ActiveRecord::RecordInvalid => e
        puts "Error saving recipe: #{e.message}"
      rescue Zlib::GzipFile::Error => e
        puts "Error reading gzipped file: #{e.message}"
      rescue JSON::ParserError => e
        puts "Error parsing JSON: #{e.message}"
      end
  end
end
