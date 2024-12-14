DOWNLOADED_FILE_PATH = 'downloaded_recipes.json.gz'

namespace :db do
  namespace :seed do
    desc 'Seed the database with recipes'

    task :download_recipes do
      require 'open-uri'
      require 'json'

      download_url = 'https://pennylane-interviewing-assets-20220328.s3.eu-west-1.amazonaws.com/recipes-en.json.gz'
      begin
        # wget https://pennylane-interviewing-assets-20220328.s3.eu-west-1.amazonaws.com/recipes-en.json.gz && gzip -dc recipes-en.json.gz > recipes-en.json
        URI.open(download_url) do |remote_file|
          File.open(DOWNLOADED_FILE_PATH, 'wb') do |local_file|
            local_file.write(remote_file.read)
          end
        end
      rescue OpenURI::HTTPError => e
        puts "Error downloading recipes: #{e.message}"
      end
    end


    task :recipes => :download_recipes do
      decompressed_data = Zlib::GzipReader.open(DOWNLOADED_FILE_PATH) do |gz|
        gz.read
      end

      json_data = JSON.parse(decompressed_data)

      json_data.for_each do |recipe_data|
        recipe_data['ingredients'].each do |ingredient_data|
          ingredient = Ingredient.find_or_create_by(name: ingredient_data['name'])



      rescue Zlib::GzipFile::Error => e
        puts "Error reading gzipped file: #{e.message}"
      rescue JSON::ParserError => e
        puts "Error parsing JSON: #{e.message}"
      end
  end
end

