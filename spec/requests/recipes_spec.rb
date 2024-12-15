require 'rails_helper'

RSpec.describe "Recipes", type: :request do
  describe "GET /index" do
    let(:json) { JSON.parse(response.body) }
    let(:recipes_data) do
      {
        'recipe1': %w[parmeggiano\ cheese tomato garlic],
        'recipe2': %w[white\ sauce provolone\ cheese]
      }
    end
    let!(:recipes) do
      recipes_data.each do |title, ingredients|
        recipe = FactoryBot.create(:recipe, title: title, ingredients_description: ingredients.join('\n'))
        ingredients.each do |description|
          FactoryBot.create(:ingredient, preparation_method: description, name: description, recipe: recipe)
        end
      end
    end

    let(:headers) { { "ACCEPT" => "application/json" } }

    before do
      get recommendations_path(query), headers: headers
    end

    context 'when rule is set to any' do
      let(:query) { { ingredients: 'cheese', rule: 'any' } }

      it do
        expect(response).to have_http_status(:ok)
      end

      it do
        expect(json.dig('recipes').size).to eq(2)
      end
    end

    context 'when rule is set to all' do
      let(:query) { { ingredients: 'provolone cheese', rule: 'all' } }

      it do
        expect(response).to have_http_status(:ok)
      end

      it do
        expect(json.dig('recipes').size).to eq(1)
      end
    end
  end
end
