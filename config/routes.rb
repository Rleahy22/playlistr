Playlistr::Application.routes.draw do
  get '/', to: 'main#index'
  get '/helper.html', to: 'main#helper'
end
