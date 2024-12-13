require 'rails_helper'

RSpec.describe Recipe, type: :model do
  subject(:recipe) { FactoryBot.build :recipe}

  describe '#valid' do
    it "is not valid without a title" do
      recipe.title = nil
      is_expected.not_to be_valid
    end

    it "is not valid without instructions" do
      recipe.instructions = nil
      is_expected.not_to be_valid
    end

    context "is not valid with a servings precision greater than 4" do
      it do
        subject.servings = 10000.445
        is_expected.not_to be_valid
      end

    end

    context "is not valid with a ratings precision greater than 4" do
      it do
        subject.ratings = 10.445
        is_expected.not_to be_valid
      end
    end

    context "is not valid with a instruction with more than 1500 characters" do
      it do
        subject.instructions = Faker::Lorem.characters(number: 1501)
        is_expected.not_to be_valid
      end
    end
  end
end
