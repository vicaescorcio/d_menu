class DropTablePreparations < ActiveRecord::Migration[7.2]
  def change
    drop_table :preparations
  end
end
