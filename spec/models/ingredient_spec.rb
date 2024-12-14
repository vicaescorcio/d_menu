require 'rails_helper'

RSpec.describe Ingredient, type: :model do
  subject(:ingredient) { FactoryBot.build(:ingredient) }

  describe '#valid' do
    it 'has name nil' do
      subject.name = nil
      is_expected.not_to be_valid
    end

    it 'has no recipe reference' do
      ingredient.recipe = nil
      is_expected.to_not be_valid
    end

    it 'has no ingredient reference' do
      ingredient.recipe = nil
      is_expected.to_not be_valid
    end

    context 'when preparation method length is greater than 255' do
      it do
        ingredient.preparation_method = Faker::Lorem.characters(number: 256)
        is_expected.to_not be_valid
      end
    end
  end
end
