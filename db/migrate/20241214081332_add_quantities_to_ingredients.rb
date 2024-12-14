class AddQuantitiesToIngredients < ActiveRecord::Migration[7.2]
  def change
    add_column :ingredients, :quantity_grams, :integer
    add_column :ingredients, :quantity_ml, :integer
    add_column :ingredients, :preparation_method, :text, limit: 255
    add_reference :ingredients, :recipe, foreign_key: true
  end
end
