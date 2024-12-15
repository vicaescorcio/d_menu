require 'rails_helper'

RSpec.describe "Recipes", type: :request do
  describe "GET /index" do

    let(:json) { JSON.parse(response.body)}

    before do
      headers = { "ACCEPT" => "application/json" }

      get recommendations_path, headers: headers
    end

    it do
      expect(response).to have_http_status(:ok)
    end

    it do
      expect(json.size).to eq(0)
    end
  end
end
