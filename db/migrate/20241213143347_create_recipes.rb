class CreateRecipes < ActiveRecord::Migration[7.2]
  def change
    create_table :recipes do |t|
      t.string :title, null: false
      t.text :instructions, limit: 1500
      t.string :category
      t.integer :cook_time_seconds
      t.integer :prep_time_seconds
      t.decimal :ratings, precision: 3, scale: 2
      t.string :author
      t.decimal :servings, precision: 4, scale: 1
      t.string :image_url

      t.timestamps
    end
  end
end
