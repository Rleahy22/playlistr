Playlistr::Application.routes.draw do
  get '/', to: 'main#index'
  get '/helper.html', to: 'main#helper'
  get '/outgoing', to: 'main#outgoing'
  post '/incoming', to: 'main#incoming'
  post '/addnumber', to: 'main#addnumber'
  post '/newsong', to: 'main#new'
  get '/allsongs', to: 'main#all'
  post '/session', to: 'main#session'
  get '/key', 'main#key'
end
