class CreatePreparations < ActiveRecord::Migration[7.2]
  def change
    create_table :preparations do |t|
      t.references :recipe, null: false, foreign_key: true
      t.references :ingredient, null: false, foreign_key: true
      t.string :quantity_unit, limit: 255
      t.decimal :quantity_amount, precision: 5, scale: 2
      t.integer :quantity_grams
      t.integer :quantity_ml
      t.string :preparation_method, limit: 255

      t.timestamps
    end
  end
end
