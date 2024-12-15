class AddIngredientsDescriptionToRecipes < ActiveRecord::Migration[7.2]
  def change
    add_column :recipes, :ingredients_description, :text, limit: 2000
  end
end
