require 'rails_helper'

RSpec.describe Ingredient, type: :model do
  subject(:ingredient) { FactoryBot.build(:ingredient) }

  describe '#valid' do
    it 'has name nil' do
      subject.name = nil
      is_expected.not_to be_valid
    end
  end
end
