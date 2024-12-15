# frozen_string_literal: true

class HelloWorldController < ApplicationController
  layout "hello_world"

  def index
    @hello_world_props = { name: "Stranger" }
  end

  def test
    respond_to do |format|
      format.json { render json: {message: 'olar'} }
    end
  end
end
