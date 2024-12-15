require 'rails_helper'

RSpec.describe Recipe, type: :model do
  subject(:recipe) { FactoryBot.build :recipe }

  describe '#valid' do
    it "has title nil" do
      recipe.title = nil
      is_expected.not_to be_valid
    end

    it "has instructions nil" do
      recipe.instructions = nil
      is_expected.not_to be_valid
    end

    context "when servings precision is greater than 4" do
      it do
        subject.servings = 10000.445
        is_expected.not_to be_valid
      end
    end

    context "when ratings precision is greater than 4" do
      it do
        subject.ratings = 10.445
        is_expected.not_to be_valid
      end
    end

    context "when instructions has more than 1500 characters" do
      it do
        subject.instructions = Faker::Lorem.characters(number: 1501)
        is_expected.not_to be_valid
      end
    end

    context "when ingredients_description has more than 2000 characters" do
      it do
        subject.ingredients_description = Faker::Lorem.characters(number: 2001)
        is_expected.not_to be_valid
      end
    end
  end

  describe 'self#recommendations_with_any_ingredients' do
    subject(:recommendations) { described_class.recommendations_with_any_ingredients(*ingredients) }

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

    context 'when ingredients are simple term in more than one recipes' do
      let(:ingredients) { ['cheese'] }

      it do
        expect(recommendations.count).to eq(2)
      end
    end

    context 'when ingredients are more than one and present in one or another recipes' do
      let(:ingredients) { ['provolone cheese', 'tomato'] }

      it do
        expect(recommendations.count).to eq(2)
      end
    end
  end

  describe 'self#recommendations_with_all_ingredients' do
    subject(:recommendations) { described_class.recommendations_with_all_ingredients(*ingredients) }

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

    context 'when ingredients are in differentrecipes' do
      let(:ingredients) { ['provolone cheese', 'tomato'] }

      it do
        expect(recommendations.count).to eq(0)
      end
    end

    context 'when ingredients are just in one recipe' do
      let(:ingredients) { ['parmeggiano cheese', 'tomato'] }

      it do
        expect(recommendations.count).to eq(1)
      end
    end
  end
end
