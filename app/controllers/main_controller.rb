class MainController < ApplicationController
  def index
    render :index
  end

  def helper
    render :helper, layout: false
  end
end
