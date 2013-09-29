class Song < ActiveRecord::Base
  attr_accessible :title
  before_save {|song| song.title = title.strip.downcase}
  validates :title, uniqueness: {:case_sensitive => false}

end
