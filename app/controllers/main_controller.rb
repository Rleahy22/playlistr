class MainController < ApplicationController

  TWILIO_ACCOUNT_SID = ENV['TWILIO_ACCOUNT_SID']
	TWILIO_AUTH_TOKEN = ENV['TWILIO_AUTH_TOKEN']
	TWILIO_NUMBER = ENV['TWILIO_NUMBER']

  def index
  	@songs = Song.all

    render :index
  end

  def helper
    render :helper, layout: false
  end

  def outgoing(number)
  	# playlist = Playlist.find(params[:playlist_id])
  	# params[:friends_numbers].each do |number|
	  # 	client.account.sms.messages.create(
	  # 		:from => TWILIO_NUMBER,
	  # 		:to => number,
	  # 		:body => "You have been invited to the playlist #{playlist.name}. To add songs to the playlist respond to this number with the id: #{playlist.text_id} and song title. For example, \"#{playlist.text_id} Wrecking Ball\""
	  # 		)

		client = Twilio::REST::Client.new TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN

		client.account.sms.messages.create(
			:from => TWILIO_NUMBER,
      # :to => '+18158612021',
			:to => number,
			:body => "You have been invited to a playlist!"
			)

		redirect_to '/'
  end

  def incoming
  	text = params[:Body]
  	from = params[:From]
  	index = text.index(' ') - 1
  	playlist_id = text[0..index]
  	# @playlist = Playlist.find_by_text_id(playlist_id)
  	song = text[index + 1..text.length]
  	@song = Song.create(title: song)
  end

  def new
    Song.create(title: params[:title])
  end

  def all
    if request.xhr?
      songs = Song.all
      @songTitles = []
      songs.each do |song|
        @songTitles << song.title
      end
      songs
      render json: songs
    else
      redirect_to '/'
    end
  end

  def addnumber
    new_number = params[:number]
    outgoing(new_number)
  end
end
