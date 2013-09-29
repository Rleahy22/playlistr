class Song < ActiveRecord::Base
  attr_accessible :title
  before_save {|song| song.title = song.title.strip.downcase}
  validates :title, uniqueness: {case_sensitive => false}

end
