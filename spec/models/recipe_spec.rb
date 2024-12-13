require 'rails_helper'

RSpec.describe Recipe, type: :model do
  subject(:recipe) { FactoryBot.build :recipe}

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
  end
end
