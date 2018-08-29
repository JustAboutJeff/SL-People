class Api::PeopleController < Api::BaseController
  respond_to :json

  def index
    result = SalesLoft::PeopleService.new.get_all
    render json: result.json, status: result.status
  end
end
