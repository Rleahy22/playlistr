class Song < ActiveRecord::Base
  attr_accessible :title
  before_save :normalize
  validates :title, uniqueness: {case_sensitive => false}

  def normalize
  	self.title.strip.downcase
  end

end
