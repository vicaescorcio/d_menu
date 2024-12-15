class RecipesController < ApplicationController
  def recommendations
    recommended_recipes = case params[:rule]
    when "any"
      Recipe.recommendations_with_any_ingredients(*params[:ingredients])
    when "all"
      Recipe.recommendations_with_all_ingredients(*params[:ingredients])
    end

    respond_to do |format|
      format.json do
        render json: { recipes: recommended_recipes.slice(0, 5) }
      end
    end
  end
end
