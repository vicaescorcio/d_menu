class RecipesController < ApplicationController
  def recommendations
    recommended_recipes = case params[:rule]
    when "any"
      Recipe.any_recommendations(*params[:ingredients])
    when "all"
      Recipe.in_recommendations(*params[:ingredients])
    end

    respond_to do |format|
      format.json do
        render json: { recipes: recommended_recipes.slice(0, 5) }
      end
    end
  end
end
