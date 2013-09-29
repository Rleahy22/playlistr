Playlistr::Application.routes.draw do
  get '/', to: 'main#index'
  get '/helper.html', to: 'main#helper'
  post '/outgoing', to: 'main#outgoing'
end
