class RecipesController < ApplicationController
  include Pagination

  def recommendations
    ingredients = params[:ingredients].split(",")
    offset = params[:offset].to_i || 0
    records_per_page = 5

    recommended_recipes = case params[:rule]
    when "any"
      Recipe.recommendations_with_any_ingredients(*ingredients).limit(records_per_page).offset(params[:offset].to_i)
    when "all"
      Recipe.recommendations_with_all_ingredients(*ingredients).limit(records_per_page).offset(params[:offset].to_i)
    end

    respond_to do |format|
      format.json do
        render json: { recipes: recommended_recipes.slice(0, 5), offset: recommended_recipes.size }
      end
    end
  end
end
