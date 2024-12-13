require 'rails_helper'

RSpec.describe Preparation, type: :model do
  subject(:preparation) { FactoryBot.build(:preparation) }

  describe '#valid' do
    it 'has no recipe reference' do
      preparation.recipe = nil
      is_expected.to_not be_valid
    end

    it 'has no ingredient reference' do
      preparation.recipe = nil
      is_expected.to_not be_valid
    end

    context 'when quantity amount precision is greater than 5' do
      it do
        preparation.quantity_amount = 1000_000
        is_expected.to_not be_valid
      end
    end

    context 'when preparation method length is greater than 255' do
      it do
        preparation.preparation_method = Faker::Lorem.characters(number: 256)
        is_expected.to_not be_valid
      end
    end
  end
end
